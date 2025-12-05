const employeesGridViewList = document.querySelector('.employees-list-grid-view');
const employeesListingViewList = document.getElementById('employees-list-listing-view');
const employeesList = document.getElementById('employees-list');

const viewSwitcher = [...document.querySelectorAll('.icon-switcher-container')];
const content = [
    document.querySelector('.employees-list-grid-view'),
    document.querySelector('.listing-view-container')
]

const basicSearchInput = document.getElementById('employee-search-input');

const emptyPage = document.getElementById('empty-page');
const pageHeader = document.querySelector('.main-header');
const pageMainContent = document.getElementById('main-content');
const pageBody = [...document.getElementsByTagName('body')];
const homePageBtn = document.getElementById('home-page-button');

const employeesAmountLarge = document.querySelector('.employees-amount-large');
const employeesAmount = document.getElementById('employees-amount');

const employeesMainContent = document.getElementById('employees-main-content');

function renderEmployeesGridViewContent(src, firstName, lastName, department, room, id) {
    return `
        <a href="employeeDetails.html?id=${id}" > 
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
        </a>
    `
}

function renderEmployeesListViewContent(src, firstName, lastName, department, room, id) {
    return `
         <a href="employeeDetails.html?id=${id}" >
            <li class="employee large-emp-listing banner-part" href="employeeDetails.html?id=${id}">
                <div class="employee-picture-and-name-listing first-part">
                    <img src="${src}" class="employee-picture-listing" alt="${firstName} ${lastName}" width="50px" height="50px"/>
                    <span class="name">${firstName} ${lastName}</span>
                </div>
                <div class="job second-part">
                    <span>${department}</span>
                    <span>LPT${room}</span>
                </div>
            </li>
        </a>
    `
}

function renderEmployeesList(src, firstName, lastName, room, id) {
    return `
        <a href="employeeDetails.html?id=${id}" >
            <li class="employee" href="employeeDetails.html?id=${id}"> 
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
        </a>
    `
}

function renderHeaderContent() {
    return `
        <div id="header-information">
            <div id="inner-header-container">
                <a  href="index.html" id="company">LEVERX</a>
                <h1 id="title">EMPLOYEE SERVICES</h1>
            </div>
            <div id="header-search">
                <div id="input-container">
                    <img src="./images/search.png" id="search-icon" alt='Search' width="18px" height="18px" />
                    <input id="search-input" placeholder="Open search panel"/>
                </div>
            </div>
            <input type="checkbox" id="menu"/>
            <label for="menu" id="hamburger"></label>

            <div id="profile-container">
                <div id="ad">
                    <h6 id="ad-title">LeverX</h6>
                    <p id="ad-desc">Explore some new opportunities</p>
                </div>
                <div id="profile">
                    <header id="profile-header">
                        <div>
                            <img src="./images/user.png" alt="Your profile icon" width="50px" height="50px"/>
                        </div>
                        <div id="name-and-sign-out">
                            <p id="profile-owner-name">Steve Cook</p>
                            <a id="sign-out">Sign out</a>
                        </div>
                    </header>
                    <p id="address-book">Address Book</p>
                    <footer>
                        <button id="support-button">
                            <img id="support-icon" src="./images/question-mark.png" alt="Question mark" width="15px" height="15px"/>
                            <p>SUPPORT</p>
                        </button>
                    </footer>
                </div>
            </div>

            <div id="address-book-large">Address Book</div>

            <div id="support-profile-turn-on-off-container">
                <div id="support-and-profile-container">
                    <button id="support-button-large">
                        <img id="support-icon" src="./images/question-mark.png" alt="Question mark" width="15px" height="15px"/>
                        <p>SUPPORT</p>
                    </button>
                    <div id="profile-large">
                        <a style="width: 100%" href="employeeDetails.html?id=1">
                            <img src="./images/user.png" alt="Your profile icon" width="20px" height="20px"/>
                            <span>STEVE COOK</span>
                        </a>
                    </div>
                </div>
                <div id="switch-on-off-container">
                    <img src="./images/turn-on-off.png" id="switch-on-off" alt="Turn on/off" width="20px" height="20px" />
                </div>
            </div>
        </div>
    `
}

pageHeader.innerHTML = renderHeaderContent();

const searchIcon  = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');
const basicSearchForm = document.querySelector('.employee-search-container-form');

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
                                                    employee.last_name, employee.department, employee.room, employee._id);

            employeesListingViewList.innerHTML += renderEmployeesListViewContent(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.department, employee.room, employee._id);

            employeesList.innerHTML += renderEmployeesList(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.room, employee._id);
        }
        
        employeesAmount.textContent = `
            ${allEmployees.length} employees displayed
        `

        employeesAmountLarge.textContent = `
            ${allEmployees.length} employees displayed
        `
    })
    .catch((err) => console.log('Failed to load', err));
}


const urlParams = new URLSearchParams(window.location.search);
const employeeId = Number(urlParams.get('id'));
async function fetchEmployeeDetails(id) {
    try {   
        const response = await fetch('employees.json');

        if (!response.ok) {
            throw new Error('Something went wrong.')
        }
        
        const employeesData = await response.json();
        return employeesData;
    } catch (err) {
        console.log('Failed to load', err);
        return null
    }
}

async function loadEmployeeDetails() {
    const employees = await fetchEmployeeDetails();

    const currentEmployee = employees.find((d) => d._id === employeeId);

    if (currentEmployee) {
        employeesMainContent.innerHTML = renderEmployeeDetails(currentEmployee);
    }
}

function formatDate(timestamp) {
    const date = new Date(timestamp);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function formatVisaDate(creation, expiration) {
    return `${formatDate(creation)} - ${formatDate(expiration)}`;
}

function renderEmployeeDetails(emp) {
    let secondVisa = '';
    let secondVisaDates = '';

    const dateBirthInfo = emp.date_birth
    const birthDate = new Date(dateBirthInfo.year, dateBirthInfo.month - 1, dateBirthInfo.day)
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const visaDates = formatVisaDate(emp.visa[0].start_date, emp.visa[0].end_date);

    if (emp.visa2) {
        secondVisa = emp.visa2[0].type;
        secondVisaDates = formatVisaDate(emp.visa2[0].start_date, emp.visa2[0].end_date);
    } else {
        secondVisa = "-";
        secondVisaDates = "-";
    }
    
        return `
            <div id="employee-general-overview">
                <img src="${emp.user_avatar}" alt="Employee profile picture" class="employee-general-overview-picture" width="50px" height="50px"/>
                <p>${emp.first_name}</p>
                <p>${emp.first_name} ${emp.middle_native_name} ${emp.last_name}</p>
                <div>
                    <img src="images/copy.png" alt="Copy" class="copy-icon" width="10px" height="10px" />
                    <span>Copy link</span>
                </div>
                <button>
                    <img src="images/edit.png" alt="Edit" class="edit-icon" width="10px" height="10px" />
                    <span id="edit-button">EDIT</span>
                </button>
            </div>
            <div id="employee-detailed-overview">

                <section id="general-info">
                    <div>
                        <label for="department">
                            <span class="material-symbols-outlined" style="font-size: 1.8rem;">
                                business_center
                            </span>
                        </label>
                        <input id="department" name="department" value="${emp.department}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Building" class="building" width="10px" height="10px" />
                            <label for="building">Building</label>
                        </div>
                        <input id="building" name="building" value="${emp.building}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Room" class="room" width="10px" height="10px" />
                            <label for="room">Room</label>
                        </div>
                        <input id="room" name="room" value="${emp.room}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Hash" class="hash" width="10px" height="10px" />
                            <label for="desk-number">Desk Number</label>
                        </div>
                        <input id="desk-number" name="desk-number" value="${emp.desk_number}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Calendar" class="calendar" width="10px" height="10px" />
                            <label for="date-of-birth">Date of birth</label>
                        </div>
                        <input id="date-of-birth" name="date-of-birth" value="${birthDate}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Person" class="manager" width="10px" height="10px" />
                            <label for="manager">Manager</label>
                        </div>
                        <input id="manager" name="manager" value="${emp.manager.first_name} ${emp.manager.last_name}" readonly />
                    </div>
                </section>

                <section id="contacts">
                    <div>
                        <div>
                            <img src="images/building.png" alt="Movile phone" class="mobile-phone" width="10px" height="10px" />
                            <label for="mobile-phone">Mobile phone</label>
                        </div>
                        <input id="mobile-phone" name="mobile-phone" value="${emp.phone}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Email" class="email" width="10px" height="10px" />
                            <label for="email">Email</label>
                        </div>
                        <input id="email" name="email" value="${emp.email}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Telegram" class="telegram" width="10px" height="10px" />
                            <label for="telegram">Telegram</label>
                        </div>
                        <input id="telegram" name="telegram" value="${emp.telegram}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="C-number" class="c-number" width="10px" height="10px" />
                            <label for="c-number">C-number</label>
                        </div>
                        <input id="c-number" name="c-number" value="${emp.cnumber}" readonly />
                    </div>
                </section>

                <section id="travel-info">
                    <div>
                        <div>
                            <img src="images/building.png" alt="Planet" class="planet" width="10px" height="10px" />
                            <label for="citizenship">Citizenship</label>
                        </div>
                        <input id="citizenship" name="citizenship" value="${emp.citizenship}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Visa 1" class="visa1" width="10px" height="10px" />
                            <label for="visa1">Viza 1</label>
                        </div>
                        <input id="visa1" name="visa1" value="${emp.visa[0].type}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Calendar" class="visa1-calendar" width="10px" height="10px" />
                            <label for="visa1-calendar">Visa 1 validity period (expired)</label>
                        </div>
                        <input id="visa1-calendar" name="visa1-calendar" value="${visaDates}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Visa 2" class="visa2" width="10px" height="10px" />
                            <label for="visa2">Visa 2</label>
                        </div>
                        <input id="visa2" name="visa2" value="${secondVisa}" readonly />
                    </div>
                    <div>
                        <div>
                            <img src="images/building.png" alt="Calendar" class="visa2-calendar" width="10px" height="10px" />
                            <label for="visa2">Visa 2 validity period</label>
                        </div>
                        <input id="visa2" name="visa2" value="${secondVisaDates}" readonly />
                    </div>
                </section>

            </div>
        `
}

const editBtn = document.getElementById('edit-btn');

document.addEventListener('click', (event) => {
    if (event.target.id === 'edit-button') {

        const inputs = document.querySelectorAll('#employee-detailed-overview input');

        inputs.forEach((input) => {
            input.removeAttribute('readonly');
            input.style.border = "1px solid black";
        });
    }
});

window.addEventListener('DOMContentLoaded', (event) => {
    loadEmployees();
    loadEmployeeDetails();
});

viewSwitcher.forEach((vs) => vs.addEventListener('click', handleContentChange));

let index = 0
function handleContentChange(event) {
    if (viewSwitcher.indexOf(event.currentTarget) === index) return;

    const currentEl = event.currentTarget;

    content[index].classList.remove('active-content');

    index = viewSwitcher.indexOf(currentEl);

    content[index].classList.add('active-content');
}


function doSearch(searchTerm) {
    let searchChars = searchTerm.toLowerCase();

    employeesGridViewList.innerHTML = "";
    employeesListingViewList.innerHTML = "";
    employeesList.innerHTML = "";

    const filtered = allEmployees.filter((employee) => {
        const fullName = employee.first_name + ' ' + employee.last_name;
        return employee.first_name.toLowerCase().includes(searchChars) || 
               employee.last_name.toLowerCase().includes(searchChars) ||
               employee._id === Number(searchChars) ||
               fullName.toLowerCase().includes(searchChars);
    });

    employeesAmount.textContent = `
        ${filtered.length} employees displayed
    `
    
    employeesAmountLarge.textContent = `
        ${filtered.length} employees displayed
    `

    for (employee of filtered) {
        employeesGridViewList.innerHTML += renderEmployeesGridViewContent(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.department, employee.room, employee._id);

        employeesListingViewList.innerHTML += renderEmployeesListViewContent(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.department, employee.room, employee._id);

        employeesList.innerHTML += renderEmployeesList(employee.user_avatar, employee.first_name, 
                                                    employee.last_name, employee.room, employee._id);
    }

    if (filtered.length === 0) {
        reusableStylesForEmptyPage();
    }
}

function syncInputs(value) {
    if (basicSearchInput.value !== value) basicSearchInput.value = value;
    if (searchInput.value !== value) searchInput.value = value;
}

basicSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue =basicSearchInput.value;

    doSearch(inputValue);
    syncInputs(inputValue);
});

searchIcon.addEventListener('click', (e) => {
    e.preventDefault();

    const inputValue =searchInput.value;

    doSearch(inputValue);
    syncInputs(inputValue);
});

homePageBtn.addEventListener('click', () => {
    pageBody.map((i) => {
        i.style.display = 'block';
    });
    
    pageHeader.style.display = 'block';
    pageMainContent.style.display = 'block';

    emptyPage.style.display = 'none';  
});
