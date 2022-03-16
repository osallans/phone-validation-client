function openNav() {
    if(document.getElementById("mySidenav").style.width!="80px"){
      document.getElementById("mySidenav").style.width = "80px";
      document.getElementById("main").style.marginLeft = "80px";
      document.getElementById("footer").style.marginLeft = "80px";
    }else{
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.getElementById("footer").style.marginLeft = "0";
    }
  }



    