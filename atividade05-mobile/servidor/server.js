require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.CLOUDINARY_URL) {
  console.error('ERRO: CLOUDINARY_URL não foi configurada no arquivo .env');
  process.exit(1);
}

// Usa as credenciais presentes em CLOUDINARY_URL
cloudinary.config({
  secure: true,
});

// Verifica se a conexão com o Cloudinary está funcionando
app.get('/api/status', (req, res) => {
  res.json({ message: 'Servidor funcionando.' });
});

// Lista as imagens armazenadas no Cloudinary
app.get('/api/images', async (req, res) => {
  try {
    const resultado = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      max_results: 100,
    });

    const images = resultado.resources.map((imagem) => ({
      public_id: imagem.public_id,
      display_name:
        imagem.display_name || imagem.public_id.split('/').pop(),
      secure_url: imagem.secure_url,
    }));

    res.json({ images });
  } catch (error) {
    console.error(
      'Erro ao listar imagens:',
      error.error?.message || error.message || error
    );

    res.status(500).json({
      message:
        error.error?.message ||
        'Não foi possível listar as imagens no Cloudinary.',
    });
  }
});

// Exclui uma imagem usando o public_id enviado no corpo da requisição
app.delete('/api/images', async (req, res) => {
  try {
    const { public_id } = req.body || {};

    if (!public_id || typeof public_id !== 'string') {
      return res.status(400).json({
        message: 'Informe um public_id válido para excluir a imagem.',
      });
    }

    const resultado = await cloudinary.uploader.destroy(public_id, {
      resource_type: 'image',
      type: 'upload',
      invalidate: true,
    });

    if (resultado.result !== 'ok') {
      return res.status(404).json({
        message: 'Imagem não encontrada ou não foi excluída.',
        resultado: resultado.result,
      });
    }

    res.json({ message: 'Imagem excluída com sucesso.' });
  } catch (error) {
    console.error(
      'Erro ao excluir imagem:',
      error.error?.message || error.message || error
    );

    res.status(500).json({
      message:
        error.error?.message ||
        'Não foi possível excluir a imagem no Cloudinary.',
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});