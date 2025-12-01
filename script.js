const employeesGridViewList = document.querySelector('.employees-list-grid-view');
const employeesListingViewList = document.getElementById('employees-list-listing-view');
const employeesList = document.getElementById('employees-list');

const viewSwitcher = [...document.querySelectorAll('.icon-switcher-container')];
const content = [
    document.querySelector('.employees-list-grid-view'),
    document.querySelector('.listing-view-container')
]

const basicSearchInput = document.getElementById('employee-search-input');
const searchInput = document.getElementById('search-input');
const basicSearchForm = document.querySelector('.employee-search-container-form');

const emptyPage = document.getElementById('empty-page');
const pageHeader = document.getElementById('main-header')
const pageMainContent = document.getElementById('main-content');
const pageBody = [...document.getElementsByTagName('body')];
const homePageBtn = document.getElementById('home-page-button');
const searchIcon  = document.getElementById('search-icon');

function renderEmployeesGridViewContent(src, firstName, lastName, department, room) {
    return `
        <li class="employee large-emp">
            <div class="employee-picture-and-name">
                <img src="${src}" class="employee-picture" alt="${firstName} ${lastName}" width="50px" height="50px"/>
                    <span class="name">${firstName} ${lastName}</span>
            </div>
            <div class="job">
                <span class="material-symbols-outlined" style="font-size: 1.8rem;">
                    business_center
                </span>
                <span>${department}</span>
                <img src="./images/mobile-phone.png" class="mobile-phone" alt="mobile-phone" width="18px" height="18px"/>
                <span>LPT${room}</span>
            </div>
        </li>
    `
}

function renderEmployeesListViewContent(src, firstName, lastName, department, room) {
    return `
        <li class="employee large-emp-listing banner-part">
            <div class="employee-picture-and-name-listing first-part">
                <img src="${src}" class="employee-picture-listing" alt="${firstName} ${lastName}" width="50px" height="50px"/>
                <span class="name">${firstName} ${lastName}</span>
            </div>
            <div class="job second-part">
                <span>${department}</span>
                <span>LPT${room}</span>
            </div>
        </li>
    `
}

function renderEmployeesList(src, firstName, lastName, room) {
    return `
        <li class="employee">
            <div class="employee-picture-and-name">
                <img src="${src}" class="employee-picture" alt="${firstName} ${lastName}" />
                <span class="name">${firstName} ${lastName}</span>
            </div>
            <div class="job">
                <span class="material-symbols-outlined" style="font-size: 1.8rem;">
                    business_center
                </span>
                <span>LPT${room}</span>
            </div>
        </li>
    `
}

function reusableStylesForEmptyPage() { 
    pageHeader.style.display = 'none';
    pageMainContent.style.display = 'none';

    emptyPage.style.display = 'flex';
    pageBody.map((i) => {
        i.style.display = 'flex';
        i.style.justifyContent = 'center';
        i.style.alignItems = 'center';
    });
}

let allEmployees = [];
const loadEmployees = () => {
    fetch('employees.json')
    .then((response) => response.json())
    .then((employees) => {
        allEmployees = employees;
        for (let employee of employees) {
            employeesGridViewList.innerHTML += renderEmployeesGridViewContent(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.department, employee.room);

            employeesListingViewList.innerHTML += renderEmployeesListViewContent(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.department, employee.room);

            employeesList.innerHTML += renderEmployeesList(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.room);
        }
    })
    .catch((err) => console.log('Failed to load', err))
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadEmployees();
})

viewSwitcher.forEach((vs) => vs.addEventListener('click', handleContentChange));

let index = 0
function handleContentChange(event) {
    if (viewSwitcher.indexOf(event.currentTarget) === index) return;

    const currentEl = event.currentTarget;

    content[index].classList.remove('active-content');

    index = viewSwitcher.indexOf(currentEl);

    content[index].classList.add('active-content');
}

function basicSearch(event) {
    event.preventDefault()

    let searchTerm = event.target.value.toLowerCase();
    
    employeesGridViewList.innerHTML = "";
    employeesListingViewList.innerHTML = "";
    employeesList.innerHTML = "";

    const filtered = allEmployees.filter((employee) => {
        const fullName = employee.first_name + ' ' + employee.last_name;
        return employee.first_name.toLowerCase().includes(searchTerm) || 
               employee.last_name.toLowerCase().includes(searchTerm) ||
               employee._id === Number(searchTerm) ||
               fullName.toLowerCase().includes(searchTerm);
    });

    for (employee of filtered) {
        employeesGridViewList.innerHTML += renderEmployeesGridViewContent(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.department, employee.room);

        employeesListingViewList.innerHTML += renderEmployeesListViewContent(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.department, employee.room);

        employeesList.innerHTML += renderEmployeesList(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.room);
    }

    basicSearchForm.addEventListener('submit', () => {
        if (filtered.length === 0) {
            reusableStylesForEmptyPage();
        }
    });

    searchIcon.addEventListener('click', () => {
        if (filtered.length === 0) {
            reusableStylesForEmptyPage();
        }
    });
}

basicSearchInput.addEventListener('input', basicSearch);
searchInput.addEventListener('input', basicSearch);
basicSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

homePageBtn.addEventListener('click', () => {
    pageBody.map((i) => {
        i.style.display = 'block';
    });
    
    pageHeader.style.display = 'block';
    pageMainContent.style.display = 'block';

    emptyPage.style.display = 'none';
    
})