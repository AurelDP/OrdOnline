<template>

  <div class="m-5">
    <router-link to="/" class="group flex place-content-center px-10 py-6 bg-white rounded-2xl shadow-md w-64 h-64">
      <div class="flex flex-col place-content-center">

        <svg v-if="role === 'patient'" class="mx-auto group-hover:fill-ord-green-100 transition h-40" fill="#2D3047"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
          <path
              d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/>
        </svg>
        <p v-if="role === 'patient'" class="mt-4 text-2xl font-black text-ord-dark-blue group-hover:text-ord-green-100 transition">Patient</p>

        <svg v-if="role === 'doctor'" class="mx-auto group-hover:fill-ord-green-100 transition h-40" fill="#2D3047"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
          <path
              d="M352 128C352 198.7 294.7 256 223.1 256C153.3 256 95.1 198.7 95.1 128C95.1 57.31 153.3 0 223.1 0C294.7 0 352 57.31 352 128zM287.1 362C260.4 369.1 239.1 394.2 239.1 424V448C239.1 452.2 241.7 456.3 244.7 459.3L260.7 475.3C266.9 481.6 277.1 481.6 283.3 475.3C289.6 469.1 289.6 458.9 283.3 452.7L271.1 441.4V424C271.1 406.3 286.3 392 303.1 392C321.7 392 336 406.3 336 424V441.4L324.7 452.7C318.4 458.9 318.4 469.1 324.7 475.3C330.9 481.6 341.1 481.6 347.3 475.3L363.3 459.3C366.3 456.3 368 452.2 368 448V424C368 394.2 347.6 369.1 320 362V308.8C393.5 326.7 448 392.1 448 472V480C448 497.7 433.7 512 416 512H32C14.33 512 0 497.7 0 480V472C0 393 54.53 326.7 128 308.8V370.3C104.9 377.2 88 398.6 88 424C88 454.9 113.1 480 144 480C174.9 480 200 454.9 200 424C200 398.6 183.1 377.2 160 370.3V304.2C162.7 304.1 165.3 304 168 304H280C282.7 304 285.3 304.1 288 304.2L287.1 362zM167.1 424C167.1 437.3 157.3 448 143.1 448C130.7 448 119.1 437.3 119.1 424C119.1 410.7 130.7 400 143.1 400C157.3 400 167.1 410.7 167.1 424z"/>
        </svg>
        <p v-if="role === 'doctor'" class="mt-4 text-2xl font-black text-ord-dark-blue group-hover:text-ord-green-100 transition">Medecin</p>

        <svg v-if="role === 'pharma'" class="mx-auto group-hover:fill-ord-green-100 transition h-40" fill="#2D3047" width="150px" height="150px"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 576 512">
          <path
              d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.6 483.2 483.9 512 448.5 512H128.1C92.75 512 64.09 483.3 64.09 448V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5H575.8zM328 232V176C328 167.2 320.8 160 312 160H264C255.2 160 248 167.2 248 176V232H192C183.2 232 176 239.2 176 248V296C176 304.8 183.2 312 192 312H248V368C248 376.8 255.2 384 264 384H312C320.8 384 328 376.8 328 368V312H384C392.8 312 400 304.8 400 296V248C400 239.2 392.8 232 384 232H328z"/>
        </svg>
        <p v-if="role === 'pharma'" class="mt-4 text-2xl font-black text-ord-dark-blue group-hover:text-ord-green-100 transition">Pharmacie</p>

        <svg v-if="role === 'healthService'" class="mx-auto group-hover:fill-ord-green-100 transition h-40" fill="#2D3047" width="150px" height="150px"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 640 512">
          <path
              d="M192 48C192 21.49 213.5 0 240 0H400C426.5 0 448 21.49 448 48V512H368V432C368 405.5 346.5 384 320 384C293.5 384 272 405.5 272 432V512H192V48zM312 64C303.2 64 296 71.16 296 80V104H272C263.2 104 256 111.2 256 120V136C256 144.8 263.2 152 272 152H296V176C296 184.8 303.2 192 312 192H328C336.8 192 344 184.8 344 176V152H368C376.8 152 384 144.8 384 136V120C384 111.2 376.8 104 368 104H344V80C344 71.16 336.8 64 328 64H312zM160 96V512H48C21.49 512 0 490.5 0 464V320H80C88.84 320 96 312.8 96 304C96 295.2 88.84 288 80 288H0V224H80C88.84 224 96 216.8 96 208C96 199.2 88.84 192 80 192H0V144C0 117.5 21.49 96 48 96H160zM592 96C618.5 96 640 117.5 640 144V192H560C551.2 192 544 199.2 544 208C544 216.8 551.2 224 560 224H640V288H560C551.2 288 544 295.2 544 304C544 312.8 551.2 320 560 320H640V464C640 490.5 618.5 512 592 512H480V96H592z"/>
        </svg>
        <p v-if="role === 'healthService'" class="mt-4 text-2xl font-black text-ord-dark-blue group-hover:text-ord-green-100 transition">Service de santé</p>

      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "cardRole",
  props: {
    role: String,
  },
}
</script>

<style scoped>

</style>