package com.example.weeklyplanning.service;

import com.example.weeklyplanning.domain.PersonStatus;
import com.example.weeklyplanning.domain.ProjectStatus;
import com.example.weeklyplanning.domain.WeekStatus;
import com.example.weeklyplanning.repository.PersonRepository;
import com.example.weeklyplanning.repository.ProjectRepository;
import com.example.weeklyplanning.repository.StatisticsRepository;
import com.example.weeklyplanning.repository.WeekRepository;
import com.example.weeklyplanning.security.AuthenticatedPrincipal;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class StatisticsService {

    private final PersonRepository personRepository;
    private final ProjectRepository projectRepository;
    private final WeekRepository weekRepository;
    private final StatisticsRepository statisticsRepository;
    private final AuditService auditService;

    public StatisticsService(PersonRepository personRepository,
                             ProjectRepository projectRepository,
                             WeekRepository weekRepository,
                             StatisticsRepository statisticsRepository,
                             AuditService auditService) {
        this.personRepository = personRepository;
        this.projectRepository = projectRepository;
        this.weekRepository = weekRepository;
        this.statisticsRepository = statisticsRepository;
        this.auditService = auditService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public byte[] exportStatistics(AuthenticatedPrincipal actor) {
        try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            createOverviewSheet(workbook);
            createWeekDistributionSheet(workbook);
            createProjectPersonTaskSheet(workbook);

            workbook.write(output);
            auditService.audit(actor.getAccountId(), actor.getUsername(), "EXPORT_STATISTICS", "STATISTICS", null, "Statistics exported", true);
            return output.toByteArray();
        } catch (IOException ex) {
            auditService.audit(actor.getAccountId(), actor.getUsername(), "EXPORT_STATISTICS", "STATISTICS", null, "Statistics export failed", false);
            throw new IllegalStateException("Unable to export statistics.", ex);
        }
    }

    private void createOverviewSheet(XSSFWorkbook workbook) {
        Sheet sheet = workbook.createSheet("Overview");
        int rowIndex = 0;

        Row header = sheet.createRow(rowIndex++);
        header.createCell(0).setCellValue("Metric");
        header.createCell(1).setCellValue("Value");

        row(sheet, rowIndex++, "Total Persons Active", personRepository.countByStatus(PersonStatus.ACTIVE));
        row(sheet, rowIndex++, "Total Persons Inactive", personRepository.countByStatus(PersonStatus.INACTIVE));
        row(sheet, rowIndex++, "Total Projects Active", projectRepository.countByStatus(ProjectStatus.ACTIVE));
        row(sheet, rowIndex++, "Total Projects Inactive", projectRepository.countByStatus(ProjectStatus.INACTIVE));
        row(sheet, rowIndex++, "Total Weeks Planned", weekRepository.countByStatus(WeekStatus.PLANNED));
        row(sheet, rowIndex++, "Total Weeks Completed", weekRepository.countByStatus(WeekStatus.COMPLETED));

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
    }

    private void createWeekDistributionSheet(XSSFWorkbook workbook) {
        Sheet sheet = workbook.createSheet("Week Distribution");
        int rowIndex = 0;

        Row header = sheet.createRow(rowIndex++);
        header.createCell(0).setCellValue("Week Code");
        header.createCell(1).setCellValue("Day Plans");
        header.createCell(2).setCellValue("Assignments");
        header.createCell(3).setCellValue("Tasks");

        List<Object[]> rows = statisticsRepository.fetchWeekPlanningSummary();
        for (Object[] rowData : rows) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(String.valueOf(rowData[0]));
            row.createCell(1).setCellValue(asLong(rowData[1]));
            row.createCell(2).setCellValue(asLong(rowData[2]));
            row.createCell(3).setCellValue(asLong(rowData[3]));
        }

        for (int i = 0; i <= 3; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void createProjectPersonTaskSheet(XSSFWorkbook workbook) {
        Sheet sheet = workbook.createSheet("Person Project Tasks");
        int rowIndex = 0;

        Row header = sheet.createRow(rowIndex++);
        header.createCell(0).setCellValue("Person");
        header.createCell(1).setCellValue("Project Code");
        header.createCell(2).setCellValue("Task Count");

        List<Object[]> rows = statisticsRepository.fetchPersonProjectTaskSummary();
        for (Object[] rowData : rows) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(String.valueOf(rowData[0]));
            row.createCell(1).setCellValue(String.valueOf(rowData[1]));
            row.createCell(2).setCellValue(asLong(rowData[2]));
        }

        for (int i = 0; i <= 2; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private void row(Sheet sheet, int rowNumber, String label, long value) {
        Row row = sheet.createRow(rowNumber);
        row.createCell(0).setCellValue(label);
        row.createCell(1).setCellValue(value);
    }

    private long asLong(Object value) {
        if (value instanceof Number number) {
            return number.longValue();
        }
        return 0L;
    }
}
