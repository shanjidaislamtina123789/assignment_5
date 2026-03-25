const API="https://phi-lab-server.vercel.app/api/v1/lab/issues";
let allIssues=[];

window.onload=function(){
    loadIssues();
};
async function loadIssues(){
    const loader=document.getElementById("loader");
    if(loader) loader.classList.remove("hidden");
    try{
        const res=await fetch(API);
        const data=await res.json();
        allIssues=data.data;
        displayIssues(allIssues);
    }catch(error){
        console.error("Error loading issues:", error);
    }finally{
        if(loader) loader.classList.add("hidden");
    }
}
function generateTagsHTML(labels){
    if(!labels) 
        {
            return "";
        }
    const uniqueTags=new Map();

    labels.forEach(label=>{
        const lowerLabel=label.toLowerCase();
        let text='';
        let tagClass='';
        let imgSrc='';

        if(lowerLabel.includes('good first issue')||lowerLabel.includes('good issue')){
            return;
        }

        else if(lowerLabel.includes('bug')){
            text='BUG';
            tagClass='bug-tag';
            imgSrc='./assets/bug.png';
        }
        else if(lowerLabel.includes('enhancement')){
            text='ENHANCEMENT';
            tagClass='enhanced-tag';
            imgSrc='./assets/enhanced.png';
        }
        else if(lowerLabel.includes('documentation')||lowerLabel.includes('help')){
            text='HELP WANTED';
            tagClass='help-tag';
            imgSrc='./assets/help.png';
        }
        else {
            return;
        }
        if(text&&!uniqueTags.has(text)){
            uniqueTags.set(text, 
                '<div class="custom-tag '+tagClass+'">'+
                  (imgSrc?'<img src="'+imgSrc+'"alt="' + text + '">':'')+
                  '<span>'+text+'</span>'+
                '</div>'
            );
        }
    });
    return Array.from(uniqueTags.values()).join('');
}
function displayIssues(issues,currentTab="all") {
    const container=document.getElementById("issueContainer");
    container.innerHTML = "";
    document.getElementById("issueCount").innerText = issues.length;

    issues.forEach(issue=>{
        const div=document.createElement("div");
        let cardClass='issue-card';
        
        if(currentTab==="all"){
            cardClass += ' ' + issue.priority.toLowerCase(); 
        }else{
           
            cardClass += ' ' + currentTab.toLowerCase(); 
        }
        div.className=cardClass;
        let statusImg=(issue.priority?.toLowerCase() === 'low') ? 'check.png' : 'Open-Status.png';
        const tagsHTML=generateTagsHTML(issue.labels);

        div.innerHTML = `
        <div class="card-header">
            <img src="./assets/${statusImg}" class="status-icon">
            <span class="priority-badge ${issue.priority?.toLowerCase()}">${issue.priority}</span>
        </div>
        <div class="issue-main">
            <h3>${issue.title}</h3>
            <p>${issue.description}</p>
        </div>
        <div class="tag-section">${tagsHTML}</div>
        <div class="issue-footer">
          <div class="user-info">
             <span>#${issue.id} by ${issue.author}</span>
          </div>
          <small>${new Date(issue.createdAt).toLocaleDateString()}</small>
        </div>`;

        div.onclick=()=>openModal(issue);
        container.appendChild(div);
    });
}
function changeTab(e,type){
    const tabs=document.querySelectorAll(".tab");
    tabs.forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");

    if(type==="all"){
        displayIssues(allIssues,"all"); 
    }else{
        const filter=allIssues.filter(i => i.status.toLowerCase()===type.toLowerCase());
        displayIssues(filter,type);
    }
}
document.getElementById("searchInput").addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        searchIssue();
    }
});

async function searchIssue(){
    const text=document.getElementById("searchInput").value;
    const loader=document.getElementById("loader");
    if(loader) loader.classList.remove("hidden");

    try{
        const res=await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=' + text);
        const data=await res.json();
        displayIssues(data.data);
    }catch(error){
        console.error("Search failed:",error);
    }finally{
        if (loader) loader.classList.add("hidden");
    }
}
function openModal(issue){
    const modal=document.getElementById("modal");
    modal.classList.add("show");
    
    document.getElementById("modalTitle").innerText=issue.title;
    document.getElementById("modalDescription").innerText=issue.description;
    document.getElementById("modalAuthor").innerText=issue.author;
    
    const assigneeField=document.getElementById("modalAssignee");
    if(issue.assignee&&issue.assignee!==""){
        assigneeField.innerText=issue.assignee;
    }else{
        assigneeField.innerText="Unassigned";
    }
    document.getElementById("modalDate").innerText=new Date(issue.createdAt).toLocaleDateString();

    const statusBadge=document.getElementById("modalStatusBadge");
    if(issue.status.toLowerCase()==='open') {
        statusBadge.innerText="Opened";
        statusBadge.style.background="#00A96E";
    }else{
        statusBadge.innerText="Closed";
        statusBadge.style.background="#7C3AED";
    }
    const priorityBadge=document.getElementById("modalPriorityBadge");
    priorityBadge.innerText=issue.priority.toUpperCase();
    priorityBadge.className='priority-badge '+issue.priority.toLowerCase();

    const modalTagSection=document.getElementById("modalTagSection");
    modalTagSection.innerHTML=generateTagsHTML(issue.labels);
}
function closeModal(){
    document.getElementById("modal").classList.remove("show");
}
