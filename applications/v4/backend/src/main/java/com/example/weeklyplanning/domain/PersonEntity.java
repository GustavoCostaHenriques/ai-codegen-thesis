package com.example.weeklyplanning.domain;

import com.example.weeklyplanning.domain.enumeration.PersonStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "persons")
public class PersonEntity extends AbstractAuditableEntity {

    @Id
    @Column(name = "person_id", nullable = false, updatable = false)
    private UUID personId;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private PersonStatus status;

    @OneToOne(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private AccountEntity account;

    @OneToMany(mappedBy = "person")
    private List<DayPersonEntity> dayPersons = new ArrayList<>();

    public UUID getPersonId() {
        return personId;
    }

    public void setPersonId(UUID personId) {
        this.personId = personId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PersonStatus getStatus() {
        return status;
    }

    public void setStatus(PersonStatus status) {
        this.status = status;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public List<DayPersonEntity> getDayPersons() {
        return dayPersons;
    }

    public void setDayPersons(List<DayPersonEntity> dayPersons) {
        this.dayPersons = dayPersons;
    }
}
