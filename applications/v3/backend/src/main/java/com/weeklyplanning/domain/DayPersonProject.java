package com.weeklyplanning.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.*;

@Entity
@Table(
    name = "day_person_project",
    uniqueConstraints = @UniqueConstraint(name = "uk_day_person_project_unique", columnNames = {"day_person_id", "project_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DayPersonProject {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "day_person_id", nullable = false)
    private DayPerson dayPerson;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @OneToMany(mappedBy = "dayPersonProject", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TaskItem> tasks = new ArrayList<>();
}
