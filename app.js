console.log('Hello World!');
const menuItems = [
    { name: "Summary", link: "#summary" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Education and Experience", link: "#education" },
    { name: "Contact Information", link: "#contact" }
];

menuItems.forEach(function(item)
{
    const listItem = $("<li>").addClass("nav-item");

    const navLink = $("<a>")
        .addClass("nav-link")
        .attr("href", item.link)
        .text(item.name);

    navLink.on("click", function(event)
    {
        event.preventDefault();

        $("html, body").animate(
        {
            scrollTop: $(item.link).offset().top
        }, 700);
    });

    listItem.append(navLink);

    $("#navMenu").append(listItem);
});
const name = "Jorge Flores";
let downloadCount = 0;
const resumeButton = document.getElementById("resume");

resumeButton.addEventListener("click", function()
{
    downloadCount++;

    document.getElementById("downloadCount").textContent =
        "Downloads: " + downloadCount;
});
function showGreeting(name)
{
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

document.getElementById("greeting").textContent = showGreeting(name);
function daysUntilDeadline(submissionDate)
{
    const currentDate = new Date();
    const deadline = new Date(submissionDate);

    const difference = deadline - currentDate;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return days;
}

const skills = ["Python", "C++", "C"];

const skillInput = $("#skillInput");
const skillsList = $("#skillsList");
function displaySkills()
{
    skillsList.empty();

    skills.forEach(function(skill, index)
    {
        const listItem = $("<li>").addClass("mb-2");

        const skillName = $("<span>")
            .text(skill)
            .css("cursor", "pointer");

        skillName.on("click", function()
        {
            const updatedSkill = prompt("Edit skill:", skill);

            if (updatedSkill !== null && updatedSkill.trim() !== "")
            {
                const duplicate = skills.some(function(item, i)
                {
                    return i !== index &&
                        item.toLowerCase() === updatedSkill.trim().toLowerCase();
                });

                if (duplicate)
                {
                    alert("This skill already exists!");
                    return;
                }

                skills[index] = updatedSkill.trim();
                displaySkills();
            }
        });

        const deleteButton = $("<button>")
            .text("Delete")
            .addClass("btn btn-danger btn-sm ms-3");

        deleteButton.on("click", function()
        {
            listItem.slideUp(300, function()
            {
                skills.splice(index, 1);
                displaySkills();
            });
        });

        listItem.append(skillName, deleteButton);
        skillsList.append(listItem);
    });
}

displaySkills();

$("#skillForm").on("submit", function(event)
{
    event.preventDefault();

    const newSkill = skillInput.val().trim();

    if (newSkill !== "")
    {
        const skillExists = skills.some(function(skill)
        {
            return skill.toLowerCase() === newSkill.toLowerCase();
        });

        if (skillExists)
        {
            alert("This skill already exists!");
            return;
        }

       skills.push(newSkill);

        displaySkills();

        skillsList.children().last().hide().fadeIn(500);

        skillInput.val("");
    }
});
$("#skillInput").on("keydown", function(event)
{
    if (event.key === "Escape")
    {
        $("#skillForm").find("input").val("");
    }
});
$("#skillSearch").on("input", function()
{
    const searchText = $(this).val().toLowerCase();

    $("#skillsList li").each(function()
    {
        const skillName = $(this).find("span").text().toLowerCase();

        if (skillName.includes(searchText))
        {
            $(this).show();
        }
        else
        {
            $(this).hide();
        }
    });
});
const projects = [
    {
        title: "Project Hedgehog From Handshake AI",
        description: "I trained AI by working on image recognition and text recognition tasks.",
        deadline: new Date("2026-01-31"),
        imageURL: "images/hedgehog1.png"
    },
    {
        title: "Python Guessing Number Game Generator",
        description: "I created a Python guessing game where users receive hints to guess a random number.",
        deadline: new Date("2026-05-01"),
        imageURL: "images/guessinggame1.png"
    },
    {
        title: "Portfolio Website Improvements",
        description: "I am improving my portfolio by adding JavaScript features and interactive elements.",
        deadline: new Date("2026-12-01"),
        imageURL: "images/portfolio.png"
    }
];

const projectList = $("#projectList");

function displayProjects()
{
    projectList.empty();

    for (let i = 0; i < projects.length; i++)
    {
        const column = $("<div>").addClass("col-12 col-md-6");

        const card = $("<div>").addClass("card h-100");

        const image = $("<img>")
            .attr("src", projects[i].imageURL)
            .attr("alt", projects[i].title)
            .addClass("card-img-top");

        const cardBody = $("<div>").addClass("card-body");

        const title = $("<h4>")
            .addClass("card-title")
            .text(projects[i].title);

        const description = $("<p>")
            .addClass("card-text")
            .text(projects[i].description);

        const deadline = $("<p>")
            .text("Deadline: " + projects[i].deadline.toLocaleDateString());

        const status = $("<p>");

        if (projects[i].deadline > new Date())
        {
            status.text("Status: Ongoing");
        }
        else
        {
            status.text("Status: Completed");
        }

        cardBody.append(title, description, deadline, status);

        card.append(image, cardBody);

        column.append(card);

        projectList.append(column);
    }
}
displayProjects();
$("#sortProjects").on("click", function()
{
    projects.sort(function(a, b)
    {
        return a.deadline - b.deadline;
    });

    displayProjects();
});
const educationData = [
    ["Northern Arizona University", "Software Engineering", "August 2025 - Present"],
    ["San Luis High School", "High School Diploma", "May 2025"],
    ["Arizona Western College", "Dual Credit Classes", "2021 - 2025"]
];

const experienceData = [
    ["Handshake AI", "AI Trainer", "December 2025 - January 2026"],
    ["RAZE", "Canvasser", "July 2026 - August 2026"]
];
function createTable(containerId, data)
{
    const container = document.getElementById(containerId);

    const table = document.createElement("table");
    table.className = "table table-striped table-hover";

    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headings = ["Institution / Company", "Degree / Position", "Duration"];

    for (let i = 0; i < headings.length; i++)
    {
        const th = document.createElement("th");
        th.textContent = headings[i];
        headerRow.appendChild(th);
    }

    header.appendChild(headerRow);
    table.appendChild(header);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < data.length; i++)
    {
        const row = document.createElement("tr");

        for (let j = 0; j < data[i].length; j++)
        {
            const cell = document.createElement("td");
            cell.textContent = data[i][j];
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);
}
createTable("educationTable", educationData);
createTable("experienceTable", experienceData);