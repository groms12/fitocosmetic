// включать на странице, где есть фильтры
const filterBlock = document.querySelector('.filter__block');
const checkboxes = document.querySelectorAll('.filter__brand .input');

function createFilterTag(category) {
    const filterTag = document.createElement('div');
    const filterTagImg = document.createElement('div');
    filterTag.textContent = category;
    filterTag.classList.add('filter__brand-block-selected');
    filterTagImg.classList.add('filter__brand-block-img');
    filterTag.append(filterTagImg);
    filterTag.addEventListener('click', function() {
        checkboxes.forEach(function(checkbox) {
            if (checkbox.dataset.name === category) {
                checkbox.checked = !checkbox.checked;
                checkbox.classList.remove('input--active');
            }
        });
        applyFilters();
    });
    return filterTag;
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.filter__brand .input:checked')).map(function(checkbox) {
        return checkbox.dataset.name;
    });

    // Очистка filterBlock
    filterBlock.innerHTML = '';

    if (selectedCategories.length >= 3) {
        const filterTagAll = document.createElement('div');
        const filterTagImg = document.createElement('div');
        filterTagAll.textContent = 'Очистить все';
        filterTagAll.classList.add('filter__brand-block-selected');
        filterTagImg.classList.add('filter__brand-block-img');
        filterTagAll.append(filterTagImg);
        filterTagAll.addEventListener('click', function() {
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
                checkbox.classList.remove('input--active');
            });
            applyFilters();
        });
        filterBlock.appendChild(filterTagAll);
    }

    selectedCategories.forEach(function(category) {
        const filterTag = createFilterTag(category);
        filterBlock.appendChild(filterTag);
    });

    // Удаление обработчиков событий для предотвращения дублирования
    checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('click', applyFilters);
        checkbox.addEventListener('click', applyFilters);
    });
}

applyFilters();