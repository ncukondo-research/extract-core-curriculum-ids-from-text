# Install and load necessary packages
if (!require("pacman")) install.packages("pacman")
pacman::p_load(dplyr, purrr, caret)

# Load data
all_ids <- read.csv("./data/all-ids.csv")
data <- read.csv("./data/data.csv")

# Function to convert ID string to set
convert_to_set <- function(id_string) {
  if (is.na(id_string)) {
    return(character(0))
  }
  return(unlist(strsplit(gsub(" ", "", id_string), ",")))
}

# Convert prediction and actual columns to sets
data <- data |>
  mutate(prediction_set = map(prediction, convert_to_set),
         actual_set = map((actual_by_student), convert_to_set))

# Function to calculate sensitivity, specificity, accuracy, precision, recall, and F1 score for each row
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
  f1 <- ifelse((precision + recall) == 0, 0, 2 * (precision * recall) / (precision + recall))
  sensitivity <- recall
  specificity <- ifelse(tn + fp == 0, 0, tn / (tn + fp))
  
  return(data.frame(accuracy, precision, recall, f1, sensitivity, specificity))
}

all_ids_list <- all_ids$id

# Calculate metrics for all rows
results <- pmap_df(list(data$prediction_set, data$actual_set), calculate_metrics, all_ids_list)

# Calculate average values
average_results <- colMeans(results, na.rm = TRUE)
print(average_results)
