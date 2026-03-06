package com.example.weeklyplanning.repository;

import com.example.weeklyplanning.domain.WeekEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface StatisticsRepository extends JpaRepository<WeekEntity, UUID> {

    @Query("""
        select w.code, count(distinct dp.id), count(distinct a.id), count(distinct t.id)
        from WeekEntity w
        left join DayPlanEntity dp on dp.week.id = w.id
        left join DayProjectEntity dpr on dpr.dayPlan.id = dp.id
        left join PlanningAssignmentEntity a on a.dayProject.id = dpr.id
        left join TaskEntity t on t.assignment.id = a.id
        group by w.code
        order by w.code
        """)
    List<Object[]> fetchWeekPlanningSummary();

    @Query("""
        select p.name, pr.code, count(t.id)
        from TaskEntity t
        join t.assignment a
        join a.person p
        join a.dayProject dp
        join dp.project pr
        group by p.name, pr.code
        order by p.name, pr.code
        """)
    List<Object[]> fetchPersonProjectTaskSummary();
}
