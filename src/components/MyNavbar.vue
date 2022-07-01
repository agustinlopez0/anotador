<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav">
        <div class="container d-flex justify-content-beetween">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="@/assets/IPS-w-b.svg" width="40" height="40" class="d-inline-block align-top mr-2" alt="">
                <div>Anotador IPS</div>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/home">Home <span class="sr-only">(current)</span></router-link>
                </li> -->
                <li class="nav-item">
                    <router-link class="nav-link" to="/events">Eventos <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/subjects">Materias <span class="sr-only">(current)</span></router-link>
                </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'MyNavbar',
}
</script>

<style scoped>
*{
    font-size: 16px;
}

#nav{
    box-shadow: 2px 2px 2px rgba(0,0,0,.2);
    margin-bottom: 20px;
}

#nav .router-link-active{
    color:rgb(255, 255, 255);
}
</style>