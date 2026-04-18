# AI and Aerospace Research Starter

## Overview

This project is an introductory data analysis and decision-support tool for exploring how artificial intelligence can be applied in aerospace research.

It compares several important aerospace AI applications, including:

* satellite image analysis
* aircraft fault detection
* weather forecasting
* autonomous navigation
* space mission planning

Using a simple scoring model, the notebook ranks these applications based on their potential usefulness by combining:

* impact
* risk
* complexity

The project also includes a small interactive interface that allows the user to select an aerospace AI application and view a quick breakdown of its scores.

---

## Project Goal

The purpose of this project is to help students explore and organize different uses of artificial intelligence in aerospace.

It is designed as:

* a beginner-friendly research starter
* a simple decision-support model
* a foundation for a larger aerospace AI project or presentation

---

## Features

* Creates a structured table of aerospace AI applications
* Calculates a usefulness score using a scoring formula
* Ranks applications from highest to lowest usefulness
* Visualizes usefulness scores with a bar chart
* Includes an interactive dropdown to inspect one application at a time
* Displays a quick score snapshot for the selected application

---

## Applications Included

* **Satellite image analysis**
* **Aircraft fault detection**
* **Weather forecasting**
* **Autonomous navigation**
* **Space mission planning**

---

## Scoring Method

Each application is scored using three factors:

* **Impact** – how important or beneficial the application could be
* **Risk** – how much safety, technical, or operational risk it may involve
* **Complexity** – how difficult it may be to implement

The notebook calculates a simple usefulness score using this formula:

```python
Usefulness = Impact * 2 - Risk + Complexity * 0.5
```

This formula is meant to provide a simple comparison model rather than a real engineering standard.

---

## Interactive Component

The notebook includes an interactive dropdown menu built with `ipywidgets`.

This allows the user to:

* choose one aerospace AI application
* view its individual scores
* generate a small bar chart snapshot of that application

This makes the notebook more visual and easier to present.

---

## Technologies Used

* Python
* Pandas
* NumPy
* Matplotlib
* ipywidgets
* Jupyter Notebook

---

## Example Output

The project produces:

* a ranked table of aerospace AI applications
* a bar chart of usefulness scores
* an interactive application viewer
* quick visual comparisons of impact, risk, and complexity

---

## File Structure

```text
.
├── AI_Aerospace_Research_Starter.ipynb
├── README.md
└── optional_screenshots/
```

---

## Installation

Install the required libraries before running the project:

```bash
pip install pandas numpy matplotlib ipywidgets
```

---

## How to Run

### In Jupyter Notebook

1. Open the notebook file
2. Run the cells in order
3. View the ranked aerospace AI table
4. Use the dropdown menu to select an application
5. Click **Show App** to view details and a score chart

### In Google Colab

Most of the notebook should run normally. Interactive widgets may require extra setup depending on the environment.

---

## Educational Value

This project is useful for learning:

* basic data analysis with Python
* scoring and ranking methods
* visualization with Matplotlib
* interactive notebook design
* how AI can be applied in aerospace engineering and research

---

## Extension Ideas

Possible ways to expand this project:

* research real aerospace companies or agencies using AI
* add one detailed case study
* compare commercial aviation vs space exploration
* create a presentation based on the notebook
* add more scoring categories such as cost, safety, and feasibility
* allow the user to adjust the scoring weights

---

## Limitations

* uses simplified manual scores rather than real industry datasets
* uses a basic scoring formula rather than a validated engineering model
* intended for educational exploration, not operational decision-making

---

## Future Improvements

Possible upgrades include:

* using real aerospace industry data
* adding more applications
* building a larger dashboard
* comparing NASA, SpaceX, airlines, and defense use cases
* exporting results into a presentation or report

---

## Disclaimer

This project is an educational prototype. The scores and rankings are simplified and should not be used as real aerospace policy or engineering decisions.

---

## Author

Louie ALruzouq
