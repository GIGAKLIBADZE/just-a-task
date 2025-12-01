const employeesGridViewList = document.querySelector('.employees-list-grid-view');
const employeesListingViewList = document.getElementById('employees-list-listing-view');
const employeesList = document.getElementById('employees-list');

const viewSwitcher = [...document.querySelectorAll('.icon-switcher-container')];
const content = [
    document.querySelector('.employees-list-grid-view'),
    document.querySelector('.listing-view-container')
]

const loadEmployees = () => {
    fetch('employees.json')
    .then((response) => response.json())
    .then((employees) => {
        for (let employee of employees) {
            employeesGridViewList.innerHTML += `
                <li class="employee large-emp">
                    <div class="employee-picture-and-name">
                        <img src="${employee.user_avatar}" class="employee-picture" alt="${employee.first_name} ${employee.last_name}" width="50px" height="50px"/>
                        <span class="name">${employee.first_name} ${employee.last_name}</span>
                    </div>
                    <div class="job">
                        <span class="material-symbols-outlined" style="font-size: 1.8rem;">
                            business_center
                        </span>
                        <span>${employee.department}</span>
                        <img src="./images/mobile-phone.png" class="mobile-phone" alt="mobile-phone" width="18px" height="18px"/>
                        <span>LPT${employee.room}</span>
                    </div>
                </li>
            `

            employeesListingViewList.innerHTML +=`
                <li class="employee large-emp-listing banner-part">
                    <div class="employee-picture-and-name-listing first-part">
                        <img src="${employee.user_avatar}" class="employee-picture-listing" alt="${employee.first_name} ${employee.last_name}" width="50px" height="50px"/>
                        <span class="name">${employee.first_name} ${employee.last_name}</span>
                    </div>
                    <div class="job second-part">
                        <span>${employee.department}</span>
                        <span>LPT${employee.room}</span>
                    </div>
                </li>
            `

            employeesList.innerHTML +=`
                <li class="employee">
                    <div class="employee-picture-and-name">
                        <img src="${employee.user_avatar}" class="employee-picture" alt="${employee.first_name} ${employee.last_name}" />
                        <span class="name">${employee.first_name} ${employee.last_name}</span>
                    </div>
                    <div class="job">
                        <span class="material-symbols-outlined" style="font-size: 1.8rem;">
                            business_center
                        </span>
                        <span>LPT${employee.room}</span>
                    </div>
                </li>
            `
        }
    })
    .catch((err) => console.log('Failed to load', err))
}

window.addEventListener('DOMContentLoaded', () => {
    loadEmployees()
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