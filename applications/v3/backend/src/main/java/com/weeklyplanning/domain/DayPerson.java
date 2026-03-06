package com.weeklyplanning.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.*;

@Entity
@Table(
    name = "day_person",
    uniqueConstraints = @UniqueConstraint(name = "uk_day_person_unique", columnNames = {"day_plan_id", "person_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DayPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "day_plan_id", nullable = false)
    private DayPlan dayPlan;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @OneToMany(mappedBy = "dayPerson", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<DayPersonProject> dayPersonProjects = new ArrayList<>();
}
