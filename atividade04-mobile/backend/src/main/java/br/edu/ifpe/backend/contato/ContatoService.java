package br.edu.ifpe.backend.contato;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ContatoService {

    private final ContatoRepository repository;

    public ContatoService(ContatoRepository repository) {
        this.repository = repository;
    }

    public List<Contato> listar(String usuarioUid) {
        return repository.findByUsuarioUid(usuarioUid);
    }

    public Contato cadastrar(ContatoDTO dto, String usuarioUid) {

        Contato contato = new Contato();

        contato.setNome(dto.getNome());
        contato.setTelefone(dto.getTelefone());
        contato.setCidade(dto.getCidade());
        contato.setAnotacao(dto.getAnotacao());

        contato.setUsuarioUid(usuarioUid);

        return repository.save(contato);
    }

    public Contato alterar(Long id, ContatoDTO dto, String usuarioUid) {

        Contato contato = repository.findByIdAndUsuarioUid(id, usuarioUid)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));

        contato.setNome(dto.getNome());
        contato.setTelefone(dto.getTelefone());
        contato.setCidade(dto.getCidade());
        contato.setAnotacao(dto.getAnotacao());

        return repository.save(contato);
    }

    public void excluir(Long id, String usuarioUid) {

        Contato contato = repository.findByIdAndUsuarioUid(id, usuarioUid)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));

        repository.delete(contato);
    }
}