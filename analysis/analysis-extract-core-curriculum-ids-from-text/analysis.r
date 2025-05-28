# Install and load necessary packages
if (!require("pacman")) install.packages("pacman")
pacman::p_load(dplyr, purrr, caret, tidyr, ggplot2, svglite, tibble)

# Function to convert item_id string to set
convert_to_set <- function(id_string) {
  if (is.na(id_string)) {
    return(character(0))
  }
  unlist(strsplit(gsub(" ", "", id_string), ","))
}

# Function to calculate sensitivity, specificity, accuracy,
# precision, recall, and F1 score for each row
calculate_metrics <- function(prediction_set, actual_set, all_ids_list) {
  y_pred_binary <- as.numeric(all_ids_list %in% prediction_set)
  y_true_binary <- as.numeric(all_ids_list %in% actual_set)

  confusion <- table(factor(y_pred_binary, levels = c(0, 1)),
                     factor(y_true_binary, levels = c(0, 1)))

  tp <- confusion[2, 2]
  fp <- confusion[2, 1]
  tn <- confusion[1, 1]
  fn <- confusion[1, 2]

  accuracy <- (tp + tn) / (tp + fp + tn + fn)
  precision <- ifelse(tp + fp == 0, 0, tp / (tp + fp))
  recall <- ifelse(tp + fn == 0, 0, tp / (tp + fn))
  f1 <- ifelse(
    (precision + recall) == 0,
    0,
    2 * (precision * recall) / (precision + recall)
  )
  sensitivity <- recall
  specificity <- ifelse(tn + fp == 0, 0, tn / (tn + fp))

  # Jaccard index calculation
  intersection <- length(intersect(prediction_set, actual_set))
  union <- length(union(prediction_set, actual_set))
  jaccard <- ifelse(union == 0, NA, intersection / union)

  tibble::tibble(
    accuracy = accuracy,
    precision = precision,
    recall = recall,
    f1 = f1,
    sensitivity = sensitivity,
    specificity = specificity,
    jaccard = jaccard
  )
}

# Load data
all_ids <- read.csv("./data/all-ids.csv")
data <- read.csv("./data/data.csv")

# Create results directory if it does not exist
if (!dir.exists("./results")) {
  dir.create("./results")
}

# Convert prediction and actual columns to sets
data <- data |>
  mutate(prediction_set = map(prediction, convert_to_set),
         actual_set = map((actual_by_student), convert_to_set))

# Add a sequential record_index
data <- data |>
  mutate(record_index = row_number())

# Build tidy_data by unnesting prediction_set and actual_set
tidy_data <- bind_rows(
  data |>
    select(record_index, prediction_set, record_letter_count) |>
    unnest(prediction_set) |>
    rename(item_id = prediction_set) |>
    mutate(type = "prediction"),

  data |>
    select(record_index, actual_set, record_letter_count) |>
    unnest(actual_set) |>
    rename(item_id = actual_set) |>
    mutate(type = "actual")
)

# Join category and item from all_ids based on matching item_id
tidy_data <- tidy_data |>
  left_join(all_ids, by = c("item_id" = "id")) |>
  select(record_index, item_id, type, category, item, record_letter_count)

# Save tidy_data to CSV
write.csv(tidy_data, "./results/tidy_data.csv", row.names = FALSE)

# Group tidy_data by record_index and calculate metrics 
# for each row using calculate_metrics function
metrics_per_record <- tidy_data |>
  group_by(record_index) |>
  summarise(
    record_index = first(record_index),
    record_letter_count = first(record_letter_count),
    calculate_metrics(
      item_id[type == "prediction"],
      item_id[type == "actual"],
      all_ids$id
    ),
    prediction = paste(item[type == "prediction"], collapse = ","),
    actual = paste(item[type == "actual"], collapse = ",")
  )

# Calculate the average values for all records
metrics_average <- metrics_per_record |>
  select(-record_index, -prediction, -actual) |>
  summarise(across(everything(), mean, na.rm = TRUE)) |>
  mutate(record_index = "average")

# Save metrics_per_record to CSV
write.csv(
  metrics_per_record,
  "./results/metrics_all_record.csv",
  row.names = FALSE
)
write.csv(
  metrics_average,
  "./results/metrics_all_average.csv",
  row.names = FALSE
)


# Create data_Symptoms, data_Examinations,
# data_Procedures dataframes from tidy_data
data_Symptoms <- tidy_data |>
  filter(category == "Symptoms") |>
  select(record_index, item_id, type, item, record_letter_count) |>
  group_by(record_index) |>
  summarise(
    record_index = first(record_index),
    calculate_metrics(
      item_id[type == "prediction"],
      item_id[type == "actual"],
      all_ids$id[all_ids$category == "Symptoms"]
    ),
    prediction = paste(item[type == "prediction"], collapse = ","),
    actual = paste(item[type == "actual"], collapse = ","),
  )

write.csv(data_Symptoms, "./results/metrics_Symptoms.csv", row.names = FALSE)

data_Symptoms_average <- data_Symptoms |>
  select(-prediction, -actual) |>
  summarise(across(everything(), mean, na.rm = TRUE)) |>
  mutate(record_index = "average")
write.csv(data_Symptoms_average, "./results/metrics_Symptoms_average.csv", row.names = FALSE)

data_Examinations <- tidy_data |>
  filter(category == "Examinations") |>
  select(record_index, item_id, type, item, record_letter_count) |>
  group_by(record_index) |>
  summarise(
    record_index = first(record_index),
    calculate_metrics(
      item_id[type == "prediction"],
      item_id[type == "actual"],
      all_ids$id[all_ids$category == "Examinations"]
    ),
    prediction = paste(item[type == "prediction"], collapse = ","),
    actual = paste(item[type == "actual"], collapse = ","),
  )
write.csv(data_Examinations, "./results/metrics_Examinations.csv", row.names = FALSE)
data_Examinations_average <- data_Examinations |>
  select(-prediction, -actual) |>
  summarise(across(everything(), mean, na.rm = TRUE)) |>
  mutate(record_index = "average")
write.csv(data_Examinations_average, "./results/metrics_Examinations_average.csv", row.names = FALSE)
data_Procedures <- tidy_data |>
  filter(category == "Procedures") |>
  select(record_index, item_id, type, item, record_letter_count) |>
  group_by(record_index) |>
  summarise(
    record_index = first(record_index),
    calculate_metrics(
      item_id[type == "prediction"],
      item_id[type == "actual"],
      all_ids$id[all_ids$category == "Procedures"]
    ),
    prediction = paste(item[type == "prediction"], collapse = ","),
    actual = paste(item[type == "actual"], collapse = ","),
  )
write.csv(data_Procedures, "./results/metrics_Procedures.csv", row.names = FALSE)
data_Procedures_average <- data_Procedures |>
  select(-prediction, -actual) |>
  summarise(across(everything(), mean, na.rm = TRUE)) |>
  mutate(record_index = "average")
write.csv(data_Procedures_average, "./results/metrics_Procedures_average.csv", row.names = FALSE)

# Calculate mean, standard deviation, min, max, and 95% confidence interval for letter_count from metrics_per_record and store as a dataframe
letter_count_summary <- metrics_per_record |>
  summarise(
    mean_letter_count = mean(record_letter_count, na.rm = TRUE),
    sd_letter_count = sd(record_letter_count, na.rm = TRUE),
    min_letter_count = min(record_letter_count, na.rm = TRUE),
    max_letter_count = max(record_letter_count, na.rm = TRUE),
    ci_lower = mean(record_letter_count, na.rm = TRUE) - qt(0.975, df = n() - 1) * (sd(record_letter_count, na.rm = TRUE) / sqrt(n())),
    ci_upper = mean(record_letter_count, na.rm = TRUE) + qt(0.975, df = n() - 1) * (sd(record_letter_count, na.rm = TRUE) / sqrt(n()))
  )
# Save letter_count_summary to CSV
write.csv(letter_count_summary, "./results/letter_count_summary.csv", row.names = FALSE)
# Plot letter_count
letter_count_plot <- ggplot(metrics_per_record, aes(x = record_letter_count)) +
  geom_histogram(binwidth = 100, fill = "blue", color = "black", alpha = 0.7) +
  labs(title = "Distribution of Record Letter Count",
       x = "Record Letter Count",
       y = "Frequency") +
  theme_minimal()

# Save the plot
ggsave("./results/letter_count_distribution.svg", plot = letter_count_plot, width = 10, height = 6)

# Using metrics_per_record, calculate the correlation between letter_count and sensitivity, specificity, accuracy, precision, recall, f1, and store as a dataframe
letter_count_correlation_results <- metrics_per_record |>
  summarise(
    sensitivity = cor(record_letter_count, sensitivity, use = "complete.obs"),
    specificity = cor(record_letter_count, specificity, use = "complete.obs"),
    accuracy = cor(record_letter_count, accuracy, use = "complete.obs"),
    precision = cor(record_letter_count, precision, use = "complete.obs"),
    recall = cor(record_letter_count, recall, use = "complete.obs"),
    f1 = cor(record_letter_count, f1, use = "complete.obs")
  )

# Save letter_count_correlation_results to CSV
write.csv(letter_count_correlation_results, "./results/letter_count_correlation_results.csv", row.names = FALSE)
