package com.example.backend.Controller;

import com.example.backend.DTO.FormationCountDTO;
import com.example.backend.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/dash")
public class dashController {
    @Autowired
    private UserService userService;
    @Autowired
    private FormateurService formateurService;
    @Autowired
    private ParticipantService participantService;
    @Autowired
    private FormationService formationService;
    @Autowired
    private ParticipationService participationService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> response = new HashMap<>();

        // Stats globales
        Map<String, Long> stats = Map.of(
                "total_users", userService.nb_users(),
                "total_formateurs", formateurService.nb_formateurs(),
                "total_participants", participantService.nb_participants(),
                "total_formations", formationService.nb_formations()
        );


        // Convertir les résultats en liste d’objets DTO
        List<FormationCountDTO> formationCounts = formationService.countFormationsByDomaine().stream()
                .map(fc -> new FormationCountDTO((String) fc[0], (Long) fc[1]))
                .collect(Collectors.toList());

        response.put("data", stats);
        response.put("ParticipationsByDomaine", participationService.countParticipationsByDomaine());

        response.put("formationCounts", formationCounts); // ici c’est bien un array dans le JSON

        return ResponseEntity.ok(response);
    }






    @GetMapping("/stats/participations")
    public ResponseEntity<?> getParticipationStats() {
        // Résultats mensuels
        List<Object[]> monthlyResult = participationService.countParticipationsByMonth();
        List<Object[]> HighMonthlyResult = participationService.getHighAttendanceMonthlyStats();
        Map<Integer, Integer> monthToCount = new HashMap<>();
        Map<Integer, Integer> highMonthToCount = new HashMap<>();

        for (Object[] row : monthlyResult) {
            int monthIndex = ((Number) row[0]).intValue();
            int count = ((Number) row[1]).intValue();
            monthToCount.put(monthIndex, count);
        }

        for (Object[] row : HighMonthlyResult) {
            int monthIndex = ((Number) row[0]).intValue();
            int count = ((Number) row[1]).intValue();
            highMonthToCount.put(monthIndex, count);
        }

        // Labels des mois
        String[] monthLabels = {"Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};

        // Construction des 12 derniers mois
        List<String> monthlyChartLabels = new ArrayList<>();
        List<Integer> monthlyChartData = new ArrayList<>();
        List<Integer> highMonthlyChartData = new ArrayList<>();

        YearMonth currentMonth = YearMonth.now();
        for (int i = 11; i >= 0; i--) {
            YearMonth ym = currentMonth.minusMonths(i);
            int monthValue = ym.getMonthValue(); // 1 à 12
            monthlyChartLabels.add(monthLabels[monthValue - 1]);
            monthlyChartData.add(monthToCount.getOrDefault(monthValue, 0));
            highMonthlyChartData.add(highMonthToCount.getOrDefault(monthValue, 0));
        }

        // Résultats quotidiens
        List<Object[]> dailyResult = participationService.countParticipationsByDayForLast30Days();
        List<Object[]> HighDailyResult = participationService.getHighAttendanceDailyStats();
        List<String> dailyChartLabels = new ArrayList<>();
        List<Integer> dailyChartData = new ArrayList<>();
        List<Integer> highDailyChartData = new ArrayList<>();

        // Création d'une map pour les participations élevées par jour
        Map<String, Integer> highDailyMap = new HashMap<>();
        for (Object[] row : HighDailyResult) {
            String day = row[0].toString(); // Date as String
            int count = ((Number) row[1]).intValue();
            highDailyMap.put(day, count);
        }

        // Remplir les labels et données journalières
        for (Object[] row : dailyResult) {
            String day = row[0].toString(); // Date as String
            int count = ((Number) row[1]).intValue();
            dailyChartLabels.add(day);
            dailyChartData.add(count);
            highDailyChartData.add(highDailyMap.getOrDefault(day, 0)); // Ajouter 0 si aucun résultat
        }

        // Construction de la réponse
        Map<String, Object> response = new LinkedHashMap<>();

        Map<String, Object> monthlyStats = new LinkedHashMap<>();
        monthlyStats.put("labels", monthlyChartLabels);
        monthlyStats.put("data", monthlyChartData);

        Map<String, Object> highMonthlyStats = new LinkedHashMap<>();
        highMonthlyStats.put("labels", monthlyChartLabels);
        highMonthlyStats.put("data", highMonthlyChartData);

        Map<String, Object> dailyStats = new LinkedHashMap<>();
        dailyStats.put("labels", dailyChartLabels);
        dailyStats.put("data", dailyChartData);

        Map<String, Object> highDailyStats = new LinkedHashMap<>();
        highDailyStats.put("labels", dailyChartLabels);
        highDailyStats.put("data", highDailyChartData);

        response.put("monthly", monthlyStats);
        response.put("highMonthly", highMonthlyStats);
        response.put("daily", dailyStats);
        response.put("highDaily", highDailyStats);

        return ResponseEntity.ok(response);
    }

}