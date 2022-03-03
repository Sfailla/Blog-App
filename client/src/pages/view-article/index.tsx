import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ArticleTitle,
  ArticleMeta,
  ContentWrapper,
  AuthorName,
  Avatar,
  CreatedDate,
  ArticleBody
} from './style'
import { PageContainer, LayoutWrapper } from '../../styles/shared'
import { convertToReadableDate } from '../../utils/helperFns'

export default function ArticleDetails(): ReactElement {
  const {
    state: { article }
  } = useLocation()

  // console.log(article)

  return (
    <PageContainer>
      <LayoutWrapper>
        <ArticleTitle role="heading" aria-level={1}>
          {article.title}
        </ArticleTitle>

        <ArticleMeta>
          <Avatar src={article.image} />
          <ContentWrapper>
            <AuthorName>{article.author.username}</AuthorName>
            <CreatedDate>{convertToReadableDate(article.createdAt)}</CreatedDate>
          </ContentWrapper>
        </ArticleMeta>

        <ArticleBody>
          <p>
            {article.body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse doloribus
            accusantium, fugit libero sapiente tenetur asperiores, praesentium eligendi maiores,
            voluptatibus maxime repudiandae! Tempora voluptatem harum facere unde architecto
            accusamus vitae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            molestias tenetur non saepe eum! Odit, reprehenderit porro? Cum laborum nostrum
            voluptatum? Soluta quisquam dolorum excepturi tenetur, quis quam placeat voluptatibus.
            Eaque laboriosam nulla reprehenderit ratione? Quia, veritatis et sequi repellendus
            laboriosam labore quo placeat incidunt. Nemo iusto temporibus ducimus expedita vel
            explicabo quos, itaque accusantium repellendus nulla, esse, labore reiciendis. Dolorem
            odio quas soluta blanditiis tempora vero? Commodi veritatis dolor a, aliquid error
            temporibus atque architecto beatae culpa ipsa corporis eos fugiat placeat fugit impedit
            doloribus repudiandae cumque ipsam. Dolor. Tempore, neque expedita quibusdam perferendis
            assumenda quod cupiditate ut excepturi reiciendis iste maxime laudantium a iure, quidem
            aliquid quia quam? Eveniet doloribus quae, magni obcaecati vel sequi cum eligendi
            excepturi?
          </p>
          <p>
            Laboriosam odit commodi rerum itaque, nihil quaerat doloremque. Quo temporibus adipisci
            dignissimos distinctio saepe quibusdam voluptates aperiam, natus eligendi suscipit
            quisquam quasi quam doloribus mollitia alias nihil sit perferendis perspiciatis?
            Nesciunt fugiat cupiditate ipsam, recusandae laboriosam praesentium enim veniam nemo
            voluptates dolore aliquid sed odio animi quod, illum tempore, explicabo omnis!
            Architecto natus officiis nulla dicta quam quos, unde obcaecati? Cupiditate, debitis
            sequi. Tempore, enim voluptatum rem consequuntur soluta nostrum perferendis alias neque
            eaque ipsam asperiores inventore dolores molestias nesciunt similique nam error
            aspernatur sint corrupti recusandae vitae suscipit at? Unde possimus sit odio placeat
            doloribus itaque minus odit vitae perspiciatis saepe, quos numquam veritatis provident
            ratione, repellat consectetur voluptatibus tempore quis quasi at aut nulla voluptates.
            Voluptas, molestias impedit. Iste porro natus iure molestiae sed perspiciatis quo
            corporis cupiditate? Voluptate autem itaque cum impedit perspiciatis magni iste officia
            aliquam quo inventore! Optio enim doloremque ducimus molestiae tempore repudiandae eos?
            Minus cupiditate nisi deserunt ullam repudiandae veniam impedit at amet vero
            necessitatibus voluptas neque velit voluptatum nam itaque quam, sapiente minima
            praesentium optio asperiores ipsum iure placeat in veritatis. Ea. Aliquam temporibus
            atque pariatur, earum eum illum voluptas blanditiis unde sequi ea assumenda dicta ad
            rerum fugit molestias accusantium officiis tempore placeat excepturi, maiores nihil sit,
            aut vel! Incidunt, autem! Veniam repudiandae qui dolores aliquam laborum sapiente
            facilis quis saepe quibusdam? Sapiente atque soluta ea delectus tenetur culpa,
            voluptatum, magnam pariatur quod asperiores, sequi ipsam molestias odio. Voluptates,
            tenetur est?
          </p>
          <p>
            Nisi, impedit qui sapiente quis, illo ipsam sint quod cumque officia, vero praesentium
            deleniti dicta? stemporibus, sunt minus deleniti. Distinctio maiores, laboriosam
            corporis incidunt aliquam neque velit illo quod optio est labore molestias
            exercitationem expedita dolore nobis vitae suscipit laudantium, ad non et ut autem
            quaerat placeat? Eos, quas! Voluptates tempore cum temporibus explicabo nulla, pariatur
            culpa delectus voluptatibus quia? Aut obcaecati earum blanditiis neque nam inventore
            voluptatem nemo libero, hic deserunt, qui quibusdam, sed eveniet officia velit.
            Repellat? Ipsum vel quaerat, eaque fugit aspernatur saepe quae quo debitis ex
            necessitatibus distinctio et dignissimos reiciendis a vitae delectus, fugiat
            exercitationem illo illum harum totam ea nostrum corrupti ab! Maxime? Eligendi deserunt
            totam similique odit laborum saepe quos modi nisi dolorum exercitationem? Eveniet, eum
            assumenda fugit repellat ipsum iusto, ipsam dicta provident doloremque voluptate tempore
            fuga commodi, vel ratione nulla? Quidem ullam natus impedit aliquid rerum architecto,
            non mollitia. Tenetur, ipsum aut eligendi facilis nemo incidunt ab eos. Ad esse corrupti
            sit laborum vero eligendi, asperiores nesciunt animi voluptas iusto! Nihil voluptas
            rerum et sunt, impedit deleniti assumenda amet! Iste, possimus dolores pariatur
            necessitatibus soluta temporibus aut dolor porro, eius magnam enim similique maiores
            nihil tempore laborum adipisci, quisquam ducimus. Facilis eligendi aut, optio impedit
            necessitatibus perspiciatis earum vel praesentium atque reprehenderit? Saepe dolorum,
            iusto voluptas est repellat quae pariatur eligendi quidem! Ea accusamus nihil hic ipsa
            aspernatur odit veritatis
          </p>
        </ArticleBody>
      </LayoutWrapper>
    </PageContainer>
  )
}
