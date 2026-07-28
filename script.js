// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 50/30/20 Budget Calculator Logic
    const monthlyIncomeInput = document.getElementById('monthly-income');
    if (monthlyIncomeInput) {
        const updateBudget = () => {
            const income = parseFloat(monthlyIncomeInput.value) || 0;
            const needs = income * 0.5;
            const wants = income * 0.3;
            const savings = income * 0.2;

            document.getElementById('needs-val').textContent = '$' + needs.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
            document.getElementById('wants-val').textContent = '$' + wants.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
            document.getElementById('savings-val').textContent = '$' + savings.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
        };
        monthlyIncomeInput.addEventListener('input', updateBudget);
        updateBudget();
    }

    // Compound Interest Calculator Logic
    const initPrincipal = document.getElementById('init-principal');
    const monthlyContrib = document.getElementById('monthly-contrib');
    const annualRate = document.getElementById('annual-rate');
    const years = document.getElementById('years');

    if (initPrincipal && monthlyContrib && annualRate && years) {
        const updateCompound = () => {
            const P = parseFloat(initPrincipal.value) || 0;
            const PMT = parseFloat(monthlyContrib.value) || 0;
            const r = (parseFloat(annualRate.value) || 0) / 100 / 12;
            const n = (parseFloat(years.value) || 0) * 12;

            let futureValue = P * Math.pow(1 + r, n);
            if (r > 0) {
                futureValue += PMT * ((Math.pow(1 + r, n) - 1) / r);
            } else {
                futureValue += PMT * n;
            }

            const totalDeposits = P + (PMT * n);
            const totalInterest = Math.max(0, futureValue - totalDeposits);

            document.getElementById('compound-result').textContent = '$' + futureValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            document.getElementById('total-deposits').textContent = '$' + totalDeposits.toLocaleString('en-US', {minimumFractionDigits: 0});
            document.getElementById('total-interest').textContent = '$' + totalInterest.toLocaleString('en-US', {minimumFractionDigits: 0});
        };

        [initPrincipal, monthlyContrib, annualRate, years].forEach(el => el.addEventListener('input', updateCompound));
        updateCompound();
    }

    // Emergency Fund Calculator Logic
    const emergencyMonthly = document.getElementById('emergency-monthly');
    const emergencyMonths = document.getElementById('emergency-months');
    if (emergencyMonthly && emergencyMonths) {
        const updateEmergency = () => {
            const monthly = parseFloat(emergencyMonthly.value) || 0;
            const months = parseFloat(emergencyMonths.value) || 6;
            const total = monthly * months;
            document.getElementById('emergency-result').textContent = '$' + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        };
        emergencyMonthly.addEventListener('input', updateEmergency);
        emergencyMonths.addEventListener('change', updateEmergency);
        updateEmergency();
    }

    // Tool Directory Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-emerald-500', 'text-slate-950', 'active');
                    b.classList.add('bg-slate-900', 'text-slate-300');
                });
                btn.classList.remove('bg-slate-900', 'text-slate-300');
                btn.classList.add('bg-emerald-500', 'text-slate-950', 'active');

                const category = btn.getAttribute('data-category');
                toolCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});


// 1. Highlight Active Nav Link Automatically
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") && currentPath.includes(link.getAttribute("href"))) {
      link.classList.add("text-emerald-400", "font-bold"); // Active Style
    }
  });

  // 2. Newsletter Subscription Handling
  const subscribeForms = document.querySelectorAll("form");
  subscribeForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector("input[type='email']");
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing with: ${emailInput.value}!`);
        emailInput.value = "";
      }
    });
  });
});

// Live Crypto & AI News Fetcher
document.addEventListener("DOMContentLoaded", function() {
    const rssUrl = "https://cointelegraph.com/rss";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const newsFeedContainer = document.getElementById("news-feed");

    if (newsFeedContainer) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok") {
                    newsFeedContainer.innerHTML = ""; 
                    const items = data.items.slice(0, 6);

                    items.forEach(item => {
                        let pubDate = new Date(item.pubDate).toLocaleDateString();
                        
                        const newsCard = document.createElement("div");
                        newsCard.className = "bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition flex flex-col justify-between";

                        newsCard.innerHTML = `
                            <div>
                                <span class="text-xs text-emerald-400 font-semibold">${pubDate}</span>
                                <h3 class="text-base font-bold text-white mt-2 mb-3 leading-snug">
                                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition">${item.title}</a>
                                </h3>
                            </div>
                            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 mt-4">Read Article &rarr;</a>
                        `;

                        newsFeedContainer.appendChild(newsCard);
                    });
                } else {
                    newsFeedContainer.innerHTML = "<p class='text-slate-400 text-sm'>Could not load news at the moment.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
                newsFeedContainer.innerHTML = "<p class='text-slate-400 text-sm'>Failed to load updates.</p>";
            });
    }
});

