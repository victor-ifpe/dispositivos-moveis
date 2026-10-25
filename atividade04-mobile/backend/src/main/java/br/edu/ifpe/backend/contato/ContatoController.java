package br.edu.ifpe.backend.contato;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contatos")
@CrossOrigin(origins = "*")
public class ContatoController {

    private final ContatoService service;
    private final FirebaseTokenService firebaseTokenService;

    public ContatoController(
            ContatoService service,
            FirebaseTokenService firebaseTokenService) {

        this.service = service;
        this.firebaseTokenService = firebaseTokenService;
    }

    @GetMapping
    public ResponseEntity<List<Contato>> listar(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {

        String usuarioUid = obterUid(authorization);

        return ResponseEntity.ok(
                service.listar(usuarioUid));
    }

    @PostMapping
    public ResponseEntity<Contato> cadastrar(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
            @RequestBody ContatoDTO dto) {

        String usuarioUid = obterUid(authorization);

        return ResponseEntity.ok(
                service.cadastrar(dto, usuarioUid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contato> alterar(
            @PathVariable Long id,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
            @RequestBody ContatoDTO dto) {

        String usuarioUid = obterUid(authorization);

        return ResponseEntity.ok(
                service.alterar(id, dto, usuarioUid));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {

        String usuarioUid = obterUid(authorization);

        service.excluir(id, usuarioUid);

        return ResponseEntity.noContent().build();
    }

    private String obterUid(String authorization) {

        if (authorization == null ||
                !authorization.startsWith("Bearer ")) {

            throw new RuntimeException("Token não informado");
        }

        String token = authorization.substring(7);

        return firebaseTokenService.obterUid(token);
    }
}