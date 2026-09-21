package br.edu.ifpe.backend.contato;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

    List<Contato> findByUsuarioUid(String usuarioUid);

    Optional<Contato> findByIdAndUsuarioUid(Long id, String usuarioUid);
}