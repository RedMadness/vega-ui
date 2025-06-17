<template>
  <div class="text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Velit euismod in pellentesque massa placerat duis ultricies. Eget
    arcu dictum varius duis at consectetur lorem donec. Justo donec enim diam vulputate ut. Amet
    nisl purus in mollis nunc sed id semper risus. Amet nisl purus in mollis nunc sed. Ac tortor
    dignissim convallis aenean. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis.
    Tellus mauris a diam maecenas sed enim ut. Dictum at tempor commodo ullamcorper a. Etiam tempor
    orci eu lobortis elementum nibh tellus. Sed adipiscing diam donec adipiscing tristique risus
    nec. Lacus luctus accumsan tortor posuere. Suspendisse faucibus interdum posuere lorem ipsum
    dolor sit. Porta lorem mollis aliquam ut porttitor leo. In nibh mauris cursus mattis molestie.
    Odio euismod lacinia at quis risus sed vulputate odio ut. Ipsum dolor sit amet consectetur
    adipiscing elit pellentesque habitant. Scelerisque in dictum non consectetur a erat. Id aliquet
    lectus proin nibh nisl condimentum. Aenean euismod elementum nisi quis eleifend quam. Tellus at
    urna condimentum mattis pellentesque id. Eget sit amet tellus cras adipiscing enim. Sit amet
    commodo nulla facilisi nullam vehicula ipsum a. Vel pharetra vel turpis nunc. Lobortis elementum
    nibh tellus molestie nunc non blandit massa enim. Amet justo donec enim diam vulputate. Congue
    nisi vitae suscipit tellus mauris a diam. Aenean pharetra magna ac placerat vestibulum. Eu
    volutpat odio facilisis mauris sit. Curabitur vitae nunc sed velit dignissim sodales. Feugiat in
    ante metus dictum at tempor. Imperdiet proin fermentum leo vel orci porta. Elementum curabitur
    vitae nunc sed velit dignissim sodales. Vitae congue mauris rhoncus aenean. Sed adipiscing diam
    donec adipiscing tristique risus nec feugiat in. Nunc lobortis mattis aliquam faucibus purus in.
    Sagittis nisl rhoncus mattis rhoncus urna. Sed odio morbi quis commodo odio aenean sed
    adipiscing diam. Risus ultricies tristique nulla aliquet enim tortor at auctor. Sit amet risus
    nullam eget. Nibh mauris cursus mattis molestie. Blandit turpis cursus in hac habitasse platea
    dictumst quisque sagittis. Purus non enim praesent elementum facilisis leo. Massa vitae tortor
    condimentum lacinia quis. Ultrices sagittis orci a scelerisque purus semper eget duis.
    Ullamcorper a lacus vestibulum sed arcu non odio. Lobortis feugiat vivamus at augue eget arcu.
    Eget velit aliquet sagittis id. Eget magna fermentum iaculis eu non diam phasellus. In egestas
    erat imperdiet sed euismod. Pellentesque massa placerat duis ultricies lacus sed turpis
    tincidunt. Risus in hendrerit gravida rutrum quisque non tellus orci. Lobortis scelerisque
    fermentum dui faucibus in. Vitae auctor eu augue ut lectus. Nunc vel risus commodo viverra
    maecenas accumsan lacus vel facilisis. Ipsum faucibus vitae aliquet nec ullamcorper sit amet
    risus nullam. Ac turpis egestas maecenas pharetra convallis. Malesuada proin libero nunc
    consequat interdum varius sit amet. Venenatis urna cursus eget nunc scelerisque viverra mauris
    in. Malesuada fames ac turpis egestas sed. Eget arcu dictum varius duis at consectetur lorem
    donec. Enim sed faucibus turpis in eu. Aenean pharetra magna ac placerat. Arcu dictum varius
    duis at consectetur lorem donec massa sapien. Porttitor eget dolor morbi non arcu. Interdum
    velit euismod in pellentesque massa placerat duis ultricies. Consequat mauris nunc congue nisi
    vitae suscipit tellus mauris. Laoreet id donec ultrices tincidunt arcu non. Sed velit dignissim
    sodales ut eu sem integer vitae. Nibh nisl condimentum id venenatis a condimentum vitae sapien.
    Integer quis auctor elit sed vulputate mi sit amet. Dui ut ornare lectus sit amet est placerat
    in egestas. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Duis ultricies lacus
    sed turpis tincidunt id aliquet risus feugiat. Molestie ac feugiat sed lectus vestibulum mattis
    ullamcorper velit. Vehicula ipsum a arcu cursus vitae. Pretium aenean pharetra magna ac placerat
    vestibulum lectus. Gravida cum sociis natoque penatibus et magnis.
  </div>
</template>

<script setup lang="ts">

import { VegaLoremIpsumProps } from '../props/VegaLoremIpsumProps'

withDefaults(defineProps<VegaLoremIpsumProps>(), {
  fontSize: '20px',
  padding: '0',
})
</script>

<style scoped>
.text {
  line-height: 40px;
  font-size: v-bind(fontSize);
  padding: v-bind(padding);
}
</style>
