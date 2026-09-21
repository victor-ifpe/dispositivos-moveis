package br.edu.ifpe.backend;

import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

@Service
public class FirebaseTokenService {

    public String obterUid(String token) {

        try {

            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            return decodedToken.getUid();

        } catch (Exception e) {

            throw new RuntimeException("Token do Firebase inválido");
        }
    }
}