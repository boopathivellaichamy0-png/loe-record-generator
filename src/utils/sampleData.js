// Sample Data Presets derived directly from student lab record PDF screenshots & extended ML experiments

import { generateSampleBarChart, generateCostReductionChart, generateScatterPlotChart } from './sampleChartSvg';

export const SAMPLE_EXPERIMENT_1 = {
  studentName: "BOOPATHI V",
  registerNo: "714025247015",
  expNo: "01",
  date: "08/07/26",
  title: "Missing Values in a Dataset and Data Visualization",
  aim: "To identify the missing values present in a student dataset, calculate the percentage of missing values for each attribute, and visualize the missing data using Python libraries.",
  algorithm: `1. Start the program.
2. Load student dataset using Pandas dataframe.
3. Display first 5 records of the dataset.
4. Calculate missing values for each column and find percentage of null entries.
5. Display data types of each feature column.
6. Visualize student attendance and semester performance using Matplotlib bar chart.
7. End the program.`,
  code: `import pandas as pd
import matplotlib.pyplot as plt

# Load Student Dataset
df = pd.read_csv('student-data.csv')
print("--- Dataset Head ---")
print(df.head())

# Missing value calculation
AgeNull = (df['Age'].isnull().sum())
percent = (AgeNull / len(df['Age'])) * 100
print(f"\nPercentage of missing values in Age: {percent:.2f}%")

# Column Data Types
print("\n--- Column Data Types ---")
print(df.dtypes)

# Bar Chart Visualization
plt.figure(figsize=(7, 4))
plt.bar(df['Name'], df['Attendance'], color='#2563eb', edgecolor='black')
plt.title('Student Attendance Distribution')
plt.xlabel('Student Name')
plt.ylabel('Attendance (%)')
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()`,
  outputType: "both",
  outputText: `--- Dataset Head ---
  Student_ID  Name     Gender  Age   Attendance  Internal_Mark  Semester_Mark
0 S101        Arun     Male    20.0  90          82             85
1 S102        Aswin    Male    20.0  85          75             78
2 S103        Ashwant  Male    20.0  78          68             72
3 S104        Abishek  Male    20.0  95          91             93
4 S105        Aravind  Male    20.0  88          84             86

Percentage of missing values in Age: 12.50 %

--- Column Data Types ---
Student_ID       object
Name             object
Gender           object
Age             float64
Attendance        int64
Internal_Mark     int64
Semester_Mark     int64
dtype: object`,
  outputImages: [generateSampleBarChart()],
  showEvalTable: true,
  evalMarks: {
    programExecution: "",
    classPerformance: "",
    viva: "",
    total: ""
  },
  result: "Thus to identify the missing values present in a student dataset, calculate the percentage of missing values for each attribute, and visualize the missing data was completed successfully."
};

export const SAMPLE_EXPERIMENT_2 = {
  studentName: "BOOPATHI V",
  registerNo: "714025247015",
  expNo: "02",
  date: "15/07/26",
  title: "Min-Max Normalization & Feature Scaling",
  aim: "To perform Min-Max Normalization on student performance dataset to scale feature values into the range [0, 1].",
  algorithm: `1. Start the program.
2. Load the student performance dataset.
3. Inspect raw feature statistics (Study Hours, Attendance, Marks).
4. Apply Scikit-Learn MinMaxScaler transformer on numerical features.
5. Compare feature distributions before and after scaling.
6. Plot feature histograms for visual comparison.
7. End the program.`,
  code: `import pandas as pd 
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

df = pd.read_csv('student_marks.csv')
d2 = pd.DataFrame(df)
print("Raw Dataset Summary:\n", d2.describe())

# Feature Histograms
plt.figure(figsize=(9, 3))
plt.subplot(1, 3, 1) 
plt.hist(df["Study_Hours"], bins=5, color='skyblue', edgecolor='black')
plt.title("Study Hours")

plt.subplot(1, 3, 2)
plt.hist(df["Attendance"], bins=5, color='lightgreen', edgecolor='black')
plt.title("Attendance")

plt.subplot(1, 3, 3)
plt.hist(df["Assignment_Marks"], bins=5, color='salmon', edgecolor='black')
plt.title("Assignment Marks")
plt.tight_layout()
plt.show()

# Min-Max Normalization
scaler = MinMaxScaler()
df[['Study_Hours','Attendance','Assignment_Marks']] = scaler.fit_transform(
    df[['Study_Hours','Attendance','Assignment_Marks']]
)
print("\nNormalized Feature Sample:\n", df.head())`,
  outputType: "both",
  outputText: `Raw Dataset Summary:
       Study_Hours  Attendance  Assignment_Marks
mean      6.400000   82.200000         78.400000
std       2.154066    8.136338          9.864076
min       3.000000   70.000000         65.000000
max       9.000000   95.000000         92.000000

Normalized Feature Sample:
   Student_id  Study_Hours  Attendance  Assignment_Marks
0        A001     0.833333    0.800000          0.888889
1        A002     0.500000    0.600000          0.629630
2        A003     0.333333    0.400000          0.407407
3        A004     0.000000    0.000000          0.000000
4        A005     1.000000    1.000000          1.000000`,
  outputImages: [generateSampleBarChart()],
  showEvalTable: true,
  evalMarks: {
    programExecution: "",
    classPerformance: "",
    viva: "",
    total: ""
  },
  result: "Thus to perform Min-Max Normalization on student performance dataset was completed successfully."
};

export const SAMPLE_EXPERIMENT_3 = {
  studentName: "BOOPATHI V",
  registerNo: "714025247015",
  expNo: "03",
  date: "15/07/26",
  title: "Maximum Likelihood Estimation (MLE)",
  aim: "To perform Maximum Likelihood Estimation (MLE) for Gaussian distribution on a dataset using mean, variance, and parameter fitting.",
  algorithm: `1. Start the program.
2. Load marks distribution dataset.
3. Estimate mean (mu) and sample variance (sigma^2).
4. Compute log-likelihood function over candidate parameter range.
5. Plot probability density function (PDF) curve fitted over histogram.
6. Compare Maximum Likelihood Estimate (MLE) against Maximum A Posteriori (MAP).
7. End the program.`,
  code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy import norm

df = pd.read_csv('marks_data.csv')
me = df['Final_marks'].mean()
var = df['Final_marks'].var(ddof=0)

print(f"Estimated MLE Mean (mu): {me:.4f}")
print(f"Estimated MLE Variance (sigma^2): {var:.4f}")

# Histogram with Gaussian Fit
plt.figure(figsize=(7, 4))
plt.hist(df['Final_marks'], density=True, alpha=0.6, color='g', edgecolor='black')
x = np.linspace(20, 100, 200)
pdf = norm.pdf(x, me, np.sqrt(var))
plt.plot(x, pdf, 'r-', linewidth=2, label='Fitted Gaussian PDF')
plt.title('MLE Gaussian Fit on Final Marks')
plt.xlabel('Marks')
plt.ylabel('Probability Density')
plt.legend()
plt.grid(True)
plt.show()`,
  outputType: "both",
  outputText: `Estimated MLE Mean (mu): 80.0000
Estimated MLE Variance (sigma^2): 81.0400

Dataset Sample:
  Student_ID  Marks
0 S101        60
1 S102        70
2 S103        80
3 S104        90
4 S105        100

Parameter Comparison:
MLE Estimated Mean : 80.0000
MAP Estimated Mean : 77.7778`,
  outputImages: [generateCostReductionChart()],
  showEvalTable: true,
  evalMarks: {
    programExecution: "",
    classPerformance: "",
    viva: "",
    total: ""
  },
  result: "Thus to perform Maximum Likelihood Estimation (MLE) for Gaussian distribution on a dataset using mean and variance estimation was completed successfully."
};

export const SAMPLE_EXPERIMENT_4 = {
  studentName: "BOOPATHI V",
  registerNo: "714025247015",
  expNo: "04",
  date: "18/07/26",
  title: "Simple & Multiple Linear Regression",
  aim: "To fit a Multiple Linear Regression model to predict house price based on area, bedrooms, and age of property.",
  algorithm: `1. Start the program.
2. Load housing market dataset.
3. Split feature matrix (X) and target vector (y).
4. Train LinearRegression model using Scikit-Learn.
5. Compute regression coefficients (slope) and intercept.
6. Evaluate model metrics: R-squared score & Mean Squared Error.
7. Plot actual vs predicted housing prices.
8. End the program.`,
  code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv('housing.csv')
X = df[['Area_sqft', 'Bedrooms', 'Age_years']]
y = df['Price_USD']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Coefficients:", model.coef_)
print("Intercept:", model.intercept_)
print("R2 Score:", r2_score(y_test, y_pred))
print("MSE:", mean_squared_error(y_test, y_pred))`,
  outputType: "both",
  outputText: `Coefficients: [154.20  18500.50 -2310.40]
Intercept: 45200.12
R2 Score: 0.9421
MSE: 28419204.50

Sample Predictions vs Actual:
  Actual Price    Predicted Price
0 $350,000        $348,200
1 $420,000        $425,100
2 $280,000        $276,400`,
  outputImages: [generateScatterPlotChart()],
  showEvalTable: true,
  evalMarks: {
    programExecution: "",
    classPerformance: "",
    viva: "",
    total: ""
  },
  result: "Thus to fit a Multiple Linear Regression model to predict housing prices based on structural features was completed successfully."
};

export const SAMPLE_EXPERIMENT_5 = {
  studentName: "BOOPATHI V",
  registerNo: "714025247015",
  expNo: "05",
  date: "21/07/26",
  title: "Gradient Descent Algorithm from Scratch",
  aim: "To implement gradient descent optimization from scratch to predict the selling price of used cars and minimize mean squared error.",
  algorithm: `1. Start the program.
2. Load automobile price dataset.
3. Preprocess categorical features (One-Hot Encoding) and standard scale input vector.
4. Initialize weight vector (theta) and bias term to zero.
5. Compute predictions: y_hat = X * theta.
6. Calculate error and cost function value: J(theta) = (1 / 2m) * sum((y_hat - y)^2).
7. Update weights iteratively using gradient update rule: theta := theta - alpha * gradient.
8. Plot cost history vs iteration count to demonstrate convergence.
9. End the program.`,
  code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv("used_cars.csv")
df = pd.get_dummies(df, columns=['Brand', 'Fuel_Type'], drop_first=True).astype(float)

X = df.drop("Price", axis=1).values
y = df["Price"].values.reshape(-1, 1)

# Feature Standard Scaling
X = (X - np.mean(X, axis=0)) / np.std(X, axis=0)
X = np.c_[np.ones((X.shape[0], 1)), X]
m = len(y)

theta = np.zeros((X.shape[1], 1))
learning_rate = 0.01
iterations = 1000
cost_history = []

for i in range(iterations):
    predictions = X.dot(theta)
    error = predictions - y
    cost = (1 / (2 * m)) * np.sum(error ** 2)
    cost_history.append(cost)
    gradient = (1 / m) * X.T.dot(error)
    theta = theta - learning_rate * gradient

print("Gradient Descent Training Completed!")
predicted = X.dot(theta)
res_df = pd.DataFrame({"Actual": y.flatten(), "Predicted": predicted.flatten().astype(int)})
print(res_df.head())

plt.figure(figsize=(7, 4))
plt.plot(cost_history, color='purple', linewidth=2)
plt.xlabel("Epoch Iterations")
plt.ylabel("Cost Function J(theta)")
plt.title("Gradient Descent Cost Minimization")
plt.grid(True)
plt.show()`,
  outputType: "both",
  outputText: `Gradient Descent Training Completed!
   Actual  Predicted
0  850000     841920
1  780000     765751
2  820000     821424
3  500000     529304
4  650000     611601

Final Mean Squared Error = 1,693,217,182.29`,
  outputImages: [generateCostReductionChart()],
  showEvalTable: true,
  evalMarks: {
    programExecution: "",
    classPerformance: "",
    viva: "",
    total: ""
  },
  result: "Thus to implement gradient descent optimization from scratch to predict used car prices was completed successfully."
};

export const SAMPLE_EXPERIMENT_6 = {
  studentName: "BOOPATHI V",
  registerNo: "714025247015",
  expNo: "06",
  date: "21/07/26",
  title: "Batch Gradient Descent Algorithm",
  aim: "To implement Batch Gradient Descent algorithm from scratch to predict laptop prices based on hardware specifications like RAM, Storage, and CPU speed.",
  algorithm: `1. Start the program.
2. Load laptop hardware price dataset.
3. Select feature variables (RAM, SSD Storage, Clock Speed, Display Size).
4. Apply Z-score normalization and augment column with bias term 1.
5. Initialize parameters and specify learning rate (alpha=0.01) and epoch steps.
6. Compute vector gradient across all training samples simultaneously in each iteration.
7. Evaluate final predicted prices against actual market prices.
8. Scatter plot actual vs predicted values with diagonal reference line.
9. End the program.`,
  code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv("laptops.csv")
X = df.drop("Laptop_Price", axis=1).values
y = df["Laptop_Price"].values.reshape(-1, 1)

# Normalization & Intercept Term
X = (X - np.mean(X, axis=0)) / np.std(X, axis=0)
X = np.c_[np.ones((X.shape[0], 1)), X]
m = len(y)

theta = np.zeros((X.shape[1], 1))
learning_rate = 0.01
iterations = 1000

for i in range(iterations):
    predictions = X.dot(theta)
    error = predictions - y
    gradient = (1 / m) * X.T.dot(error)
    theta = theta - learning_rate * gradient

print("Batch Gradient Training Completed!")
predicted = X.dot(theta)
res_df = pd.DataFrame({"Actual": y.flatten(), "Predicted": predicted.flatten().astype(int)})
print(res_df.head())

plt.figure(figsize=(6, 5))
plt.scatter(y, predicted, color='blue', alpha=0.7)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--', linewidth=2)
plt.xlabel("Actual Market Price (INR)")
plt.ylabel("Model Predicted Price (INR)")
plt.title("Actual vs Predicted Laptop Price Scatter")
plt.grid(True)
plt.show()`,
  outputType: "both",
  outputText: `Batch Gradient Training Completed!
   Actual Price  Predicted Price
0         45000            45921
1         55000            58203
2         75000            78509
3         90000            94606
4         35000            33754

Mean Squared Error = 11,281,197.38
Predicted Test Laptop Price = 83,633 INR`,
  outputImages: [generateScatterPlotChart()],
  showEvalTable: true,
  evalMarks: {
    programExecution: "",
    classPerformance: "",
    viva: "",
    total: ""
  },
  result: "Thus, the Batch Gradient Descent algorithm was successfully implemented from scratch to predict laptop prices."
};
