<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <h1 class="self-center ord-text-title mt-10 ml-10">Notre histoire</h1>
    <h1 class="ord-text-title mt-10 ml-10 md:text-left text-center">Qui sommes nous ?</h1>
    <div class="flex flex-wrap ord-px-body-adapt md:gap-5 gap-10 my-20 place-content-center">
      <a href="https://www.linkedin.com/in/aurelien-duv/" target="_blank">
        <InfoBubble
          class="transition hover:scale-110"
          blackWord="Aurélien Duval"
          :path="require('../assets/About/aurelien.png')"
          image-size="w-52 h-52"
          bubble-size="w-56 h-56"
         />
      </a>
      <a href="https://www.linkedin.com/in/bastien-facqueur-0323b619b/" target="_blank">
        <InfoBubble
          class="transition hover:scale-110"
          blackWord="Bastien Facqueur"
          :path="require('../assets/About/bastien.png')"
          image-size="w-52 h-52"
          bubble-size="w-56 h-56"

        />
      </a>
      <a href="https://www.linkedin.com/in/joel-gabbai/" target="_blank">
        <InfoBubble
          class="transition hover:scale-110"
          blackWord="Joel Gabbai"
          :path="require('../assets/About/joel.png')"
          image-size="w-52 h-52"
          bubble-size="w-56 h-56"
        />
      </a>
      <a href="https://www.linkedin.com/in/kylian-sauv%C3%A9e-8822b319b/" target="_blank">
        <InfoBubble
          class="transition hover:scale-110"
          blackWord="Kylian Sauvee"
          :path="require('../assets/About/kylian.png')"
          image-size="w-52 h-52"
          bubble-size="w-56 h-56"
        />
      </a>
      <a href="https://www.linkedin.com/in/maxime-tata-157143222/" target="_blank">
        <InfoBubble
          class="transition hover:scale-110"
          blackWord="Maxime Tata"
          :path="require('../assets/About/maxime.png')"
          image-size="w-52 h-52"
          bubble-size="w-56 h-56"
        />
      </a>
    </div>
    <h1 class="ord-text-title mt-10 ml-10 md:text-left text-center">Pourquoi ce site ?</h1>
    <p class="text-center text-justify ord-text-subtitle my-10 mx-10">Nous sommes 5 étudiants à Efrei Paris et nous avions pour mission de réaliser une plateforme qui simpliefierai
    le quotidien des patients, des services de santé, des médecins et des pharmacies. Ce site a donc pour but
    de répondre à cette demande et s'adresse à chacun de ces acteurs. Il permet de créer des ordonnances,
    de les transmettre et joue le rôle d'intermédiaire entre les personnes concernées. En utilisant Ord'Online
    vous associerez économie de papier, confidentialité et simplicité.</p>
    <h1 class="ord-text-title mt-10 ml-10 md:text-left text-center">Retrouvez ici :</h1>
    <div class="flex flex-wrap ord-px-body-adapt md:gap-48 gap-10 my-20 place-content-center">
      <a href="https://www.efrei.fr/" target="_blank">
        <InfoBubble
            class="transition hover:scale-110"
            blackWord="Notre école"
            :path="require('../assets/About/logo_efrei.png')"
            image-size="w-52 h-52"
            bubble-size="w-56 h-56"
        />
      </a>
      <a href="https://github.com/AurelDP/OrdOnline" target="_blank">
        <InfoBubble
            class="transition hover:scale-110"
            blackWord="Le github du projet"
            :path="require('../assets/About/logo_github.png')"
            image-size="w-52 h-52"
            bubble-size="w-56 h-56"
        />
      </a>
    </div>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import InfoBubble from "@/components/homePage/InfoBubble";

export default {
  name: 'AboutView',
  components: {
    InfoBubble,
    AdaptFooterBackground,
    Navbar,
  }
}
</script>