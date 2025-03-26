package com.example.backend.DTO;




public class LoginRequest {
    String login;
    String password;

    public LoginRequest(String email, String password) {
        this.login = email;
        this.password = password;
    }

    public LoginRequest() {
    }
    public String getLogin(){
        return login;
    }
    public void  setLogin(String login){
        this.login=login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

