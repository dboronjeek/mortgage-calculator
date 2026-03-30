const form = document.getElementById("mortgage-form");
const emptyView = document.getElementById("empty-view");
const resultsView = document.getElementById("results-view");
const clearBtn = document.getElementById("clear-all");

const inputs = {
  amount: document.getElementById("amount"),
  term: document.getElementById("term"),
  rate: document.getElementById("rate"),
};

const fields = {
  amount: document.getElementById("amount-field"),
  term: document.getElementById("term-field"),
  rate: document.getElementById("rate-field"),
  type: document.getElementById("type-field"),
};

// Micanje greške dok korisnik piše
Object.keys(inputs).forEach((key) => {
  inputs[key].addEventListener("input", () => {
    if (inputs[key].value) fields[key].classList.remove("error");
  });
});

document.querySelectorAll('input[name="m-type"]').forEach((radio) => {
  radio.addEventListener("change", () => fields.type.classList.remove("error"));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  const selectedType = document.querySelector('input[name="m-type"]:checked');

  if (!inputs.amount.value) {
    fields.amount.classList.add("error");
    isValid = false;
  }
  if (!inputs.term.value) {
    fields.term.classList.add("error");
    isValid = false;
  }
  if (!inputs.rate.value) {
    fields.rate.classList.add("error");
    isValid = false;
  }
  if (!selectedType) {
    fields.type.classList.add("error");
    isValid = false;
  }

  if (isValid) {
    const p = parseFloat(inputs.amount.value);
    const n = parseFloat(inputs.term.value) * 12;
    const i = parseFloat(inputs.rate.value) / 100 / 12;

    let monthly =
      selectedType.value === "repayment"
        ? (p * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1)
        : p * i;

    const total = monthly * n;
    const formatter = new Intl.NumberFormat("hr-HR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    });

    document.getElementById("monthly-val").innerText =
      formatter.format(monthly);
    document.getElementById("total-val").innerText = formatter.format(total);

    emptyView.classList.add("hidden");
    resultsView.classList.remove("hidden");

    if (window.innerWidth < 800) {
      resultsView.scrollIntoView({ behavior: "smooth" });
    }
  }
});

clearBtn.addEventListener("click", () => {
  form.reset();
  Object.values(fields).forEach((f) => f.classList.remove("error"));
  emptyView.classList.remove("hidden");
  resultsView.classList.add("hidden");
});
