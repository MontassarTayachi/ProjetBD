package com.example.backend.DTO;

public class FormationCountDTO {
    private String domaine;
    private Long count;

    public FormationCountDTO(String domaine, Long count) {
        this.domaine = domaine;
        this.count = count;
    }

    // Getters et setters
    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}

