document.getElementById("loginForm").addEventListener("submit",function(event){
    event.preventDefault();
    const username=document.getElementById("username").value.trim();
    const password=document.getElementById("password").value.trim();
  
    if(username==="admin"&&password==="admin123") {
      alert("Login successful!");
      window.location.href="home.html"; 
    }else{
      alert("Invalid credentials");
    }
  });
    