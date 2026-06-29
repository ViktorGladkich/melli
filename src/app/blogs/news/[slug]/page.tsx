import React from "react";
import { notFound } from "next/navigation";
import { BlogPostsSection } from "@/components/home/blog-posts-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  image: string;
  content: React.ReactNode;
}

const mockBlogPosts: Record<string, BlogPost> = {
  "abaya-styling": {
    title: "Wie man Abayas für jeden Anlass stylt",
    author: "Amina",
    date: "Juni 25, 2026",
    image: "/blog/blog_office_style.png",
    content: (
      <>
        <p className="mb-6">
          Die Abaya ist längst mehr als nur ein traditionelles Kleidungsstück – sie hat sich zu einem absoluten Fashion-Statement entwickelt. In der heutigen Modewelt steht sie für Eleganz, Anmut und zeitlose Schönheit. Ob elegant, lässig oder festlich, die Möglichkeiten sind grenzenlos, wenn man weiß, wie man dieses wundervolle Kleidungsstück richtig in Szene setzt. Bei <strong>MILLY</strong> glauben wir fest daran, dass jede Frau in einer Abaya strahlen kann.
        </p>
        <p className="mb-6">
          Unsere Kundinnen fragen uns oft: &quot;Wie kann ich meine Abaya so stylen, dass sie sowohl im Büro als auch beim Kaffeetrinken mit Freundinnen passend wirkt?&quot; Die Antwort liegt im gekonnten Layering, in der Wahl der richtigen Accessoires und im Spiel mit verschiedenen Texturen. In diesem Guide verraten wir Ihnen unsere besten Styling-Geheimnisse.
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">1. Der entspannte Alltags-Look</h3>
        <p className="mb-6">
          Für einen entspannten Alltag eignen sich offene Abayas aus leichten Stoffen wie Leinen oder hochwertiger Baumwolle hervorragend. Kombinieren Sie ein fließendes Modell in sanften Erdtönen (wie Sand, Khaki oder sanftem Terrakotta) mit einer bequemen, weiten Stoffhose (Palazzo) oder einer schlichten Mom-Jeans und einem einfachen weißen Basic-Shirt. 
        </p>
        <p className="mb-6">
          Das bringt eine unglaubliche Leichtigkeit in den Tag. Flache Schuhe, schicke Leder-Loafer oder sogar strahlend weiße Sneaker runden das Outfit perfekt ab und sorgen dafür, dass Sie den ganzen Tag über bequem und stilvoll unterwegs sind. Vergessen Sie nicht eine praktische Tote-Bag und eine große Sonnenbrille für den ultimativen City-Look!
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">2. Elegante Abendgarderobe & Besondere Anlässe</h3>
        <p className="mb-6">
          Für festliche Anlässe, wie Hochzeiten, Eid-Feiern oder formelle Abendessen, empfehlen wir geschlossene oder wickelbare Abayas mit edlen Stickereien, dezenten Pailletten-Details oder aus luxuriös glänzenden Stoffen wie Satin und Seide. Dunkle, satte Farben wie Smaragdgrün, Marineblau, tiefes Burgunderrot oder natürlich klassisches Schwarz wirken besonders majestätisch und luxuriös. 
        </p>
        <p className="mb-6">
          Kombinieren Sie dazu hohe Schuhe, filigranen Goldschmuck und eine elegante, strukturierte Clutch, um den Look abzurunden. Ein farblich passender, sanft fallender Premium-Chiffon-Hijab vollendet dieses atemberaubende Ensemble. Der Trick für den Abend: Halten Sie das Make-up klassisch mit einem roten Lippenstift oder dezentem Nude-Look, um der Abaya die volle Aufmerksamkeit zu schenken.
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">3. Der Professional Office-Look</h3>
        <p className="mb-6">
          Im Berufsalltag ist ein professioneller und dennoch bescheidener Look gefragt, der Respekt ausstrahlt. Geschlossene Abayas in neutralen Tönen wie Beige, Grau, Taupe oder Navyblau sind hier die beste Wahl. Achten Sie auf klare, minimalistische Schnitte und hochwertige, strukturierte Stoffe (wie Crêpe), die auch nach stundenlangem Sitzen am Schreibtisch nicht zu sehr knittern. 
        </p>
        <p className="mb-6">
          Tragen Sie darunter eine schicke Bluse und eine Anzughose. Mit einer eleganten, geräumigen Handtasche (in die auch Ihr Laptop passt), dezentem Make-up und eleganten Pumps oder spitzen Flats sind Sie bereit für jedes Meeting. Ein eng anliegender Jersey-Hijab sorgt dafür, dass nichts verrutscht und Sie sich voll auf Ihre Arbeit konzentrieren können.
        </p>
        <div className="bg-gray-50 p-8 rounded-xl mt-12 mb-8 border border-gray-100">
          <h4 className="text-xl font-medium mb-3 text-black">Pflegetipp von MILLY</h4>
          <p className="text-gray-600">
            Damit Ihre Abaya lange wunderschön bleibt, empfehlen wir Handwäsche oder den Schonwaschgang bei maximal 30 Grad. Hängen Sie die Abaya feucht auf einen Bügel, um Faltenbildung zu vermeiden, und bügeln Sie sie stets auf links oder mit Dampf!
          </p>
        </div>
      </>
    )
  },
  "modest-fashion-trends": {
    title: "Modest Fashion: Trends für die kommende Saison",
    author: "Amina",
    date: "Juni 25, 2026",
    image: "/blog/blog_skirt_length.png",
    content: (
      <>
        <p className="mb-6">
          Die Welt der Modest Fashion entwickelt sich rasant weiter und beweist jede Saison aufs Neue, dass Bedeckung und High-Fashion perfekt miteinander harmonieren. In der kommenden Saison sehen wir viele fließende Stoffe, gedeckte Farben und innovative Schnitte, die unsere Garderobe bereichern werden. Modest Fashion ist schon lange nicht mehr nur ein Trend – es ist eine globale Bewegung, die Selbstbewusstsein und Stil vereint.
        </p>
        <p className="mb-6">
          Eines ist sicher: Modest Fashion prägt mittlerweile die größten Laufstege der Welt in Paris, Mailand und New York. Wir bei <strong>MILLY</strong> haben die wichtigsten Trends für Sie analysiert und zeigen Ihnen, wie Sie diese direkt in Ihren Alltag integrieren können, ohne Kompromisse bei Ihren Werten eingehen zu müssen.
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">Die Magie des Layerings</h3>
        <p className="mb-6">
          Ein großer Trend in diesem Jahr sind durchdachte, mehrdimensionale Layering-Looks. Ein langes, schlichtes Slip-Dress aus Seide unter einer leichten, offenen Chiffon-Abaya oder einem langen, strukturierten Trenchcoat schafft nicht nur Tiefe im Outfit, sondern auch eine unfassbar elegante, fließende Silhouette. 
        </p>
        <p className="mb-6">
          Durch das Kombinieren verschiedener Stoffe – wie zum Beispiel grober Strick über feinem Satin oder matter Crêpe in Kombination mit Organza – entsteht ein spannender Kontrast, der jedes noch so einfache Outfit extrem aufwertet. Layering ist zudem unfassbar praktisch für den Übergang zwischen den Jahreszeiten!
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">Asymmetrische Schnitte und Raffungen</h3>
        <p className="mb-6">
          Ebenfalls im Kommen sind asymmetrische Schnitte und subtile, drapierte Raffungen. Diese raffinierten Details verleihen dem Outfit eine gewisse Dynamik und Modernität, ohne aufdringlich oder zu figurbetont zu wirken. Asymmetrische Säume bei Tuniken, asymmetrische Knopfleisten oder raffiniert geschnittene Ärmel bei Abayas sind ein echter Hingucker.
        </p>
        <p className="mb-6">
          Sie brechen die klassischen geraden Linien auf und lenken den Blick auf das Design des Kleidungsstücks. Tragen Sie dazu am besten sehr schlichte Accessoires, damit der Schnitt der Abaya für sich selbst sprechen kann.
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">Monochrome Eleganz</h3>
        <p className="mb-6">
          Der Ton-in-Ton-Trend bleibt uns auch diese Saison definitiv erhalten. Ein komplettes Outfit in verschiedenen Nuancen derselben Farbe zu tragen (vom Hijab über die Abaya bis hin zu Hose und Schuhen), streckt die Silhouette optisch und wirkt unglaublich luxuriös und durchdacht. 
        </p>
        <p className="mb-6">
          Besonders beliebt sind aktuell warme Sandtöne, sanftes Pistaziengrün, Staubrosa und kräftiges Burgunderrot. Der Schlüssel zu einem perfekten monochromen Look liegt darin, verschiedene Texturen in der gleichen Farbfamilie zu mischen. Ein matter Crepe-Hijab zu einer seidenmatten Satin-Abaya und Wildlederschuhen – Perfektion!
        </p>
      </>
    )
  },
  "perfect-hijab-color": {
    title: "Der perfekte Hijab für Ihren Hauttyp",
    author: "Amina",
    date: "Juni 25, 2026",
    image: "/blog/blog_blazer_style.png",
    content: (
      <>
        <p className="mb-6">
          Die Wahl der richtigen Hijab-Farbe ist eine echte Kunst für sich und kann Ihr gesamtes Erscheinungsbild verändern. Sie tragen diese Farbe direkt am Gesicht – sie kann Ihren Teint zum Strahlen bringen, Ihre Augen betonen und Sie frisch aussehen lassen, oder Sie unglücklicherweise fahl und müde wirken lassen. 
        </p>
        <p className="mb-6">
          Es ist daher entscheidend, Ihren Hautunterton zu kennen, um die Farbpalette zu finden, die Ihre natürliche Schönheit am allerbesten unterstreicht. Wir bei <strong>MILLY</strong> haben eine riesige Auswahl an Nuancen, und dieser Guide soll Ihnen helfen, zielsicher Ihre perfekten Töne zu finden.
        </p>
        <p className="mb-6">
          Generell unterscheiden wir in der Farblehre zwischen kühlen, warmen und neutralen Untertönen. Ein einfacher Test: Schauen Sie auf die Adern an der Innenseite Ihres Handgelenks im natürlichen Tageslicht. Schimmern sie eher bläulich bis lila, haben Sie einen kühlen Unterton. Wirken sie grünlich, ist Ihr Unterton warm. Bei einer Mischung aus beiden haben Sie wahrscheinlich einen neutralen Unterton.
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">1. Kühler Hautunterton</h3>
        <p className="mb-6">
          Menschen mit kühlem Unterton sehen in klaren, &quot;eisigen&quot; Farben und kräftigen Juwelentönen absolut fantastisch aus. Setzen Sie auf Farben wie königliches Saphirblau, Smaragdgrün, klares Schneeweiß, tiefes Magenta oder ein kühles Lila. Auch kühle Pastelltöne wie Babyblau oder eisiges Rosa schmeicheln Ihnen enorm.
        </p>
        <p className="mb-6">
          Vermeiden Sie zu warme Orange- oder Gelbtöne sowie senf- oder ziegelrote Farben, da diese Ihre Haut leicht fahl wirken lassen können. Bei Schmuck sollten Sie eher zu Silber oder Weißgold greifen. Ein silbrig glänzender Seiden-Hijab ist für Sie die perfekte Wahl für besondere Anlässe.
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">2. Warmer Hautunterton</h3>
        <p className="mb-6">
          Wenn Sie einen warmen Unterton haben, schmeicheln Ihnen erdige und herbstliche Farben besonders gut, da sie die Wärme Ihrer Haut reflektieren. Greifen Sie zu Camel, warmem Sandbeige, Olivegrün, sattem Rostrot, Senfgelb oder warmem Pfirsich. 
        </p>
        <p className="mb-6">
          Ein Hijab in einem warmen Nude-Ton, Zimt oder Schokoladenbraun wird Ihren Teint wundervoll weichzeichnen und Sie regelrecht leuchten lassen. Kühle, harte Farben wie reines Weiß, Eisblau oder Neon-Pink sollten Sie eher meiden und stattdessen zu einem sanften Cremeweiß oder Elfenbein greifen. Goldschmuck harmoniert perfekt mit Ihrem Teint!
        </p>
        <h3 className="text-2xl font-medium mt-10 mb-5 text-black">3. Neutraler Hautunterton</h3>
        <p className="mb-6">
          Haben Sie einen neutralen Unterton, können Sie sich wirklich glücklich schätzen: Sie sind ein echtes Chamäleon und können fast alles tragen! Sowohl kühle als auch warme Töne stehen Ihnen gut. Sie können also ganz nach Stimmung und Jahreszeit variieren.
        </p>
        <p className="mb-6">
          Besonders vorteilhaft und elegant wirken bei Ihnen jedoch gedeckte Farben und sanfte Pastelltöne. Ein sanftes Altrosa, ein gedämpftes Mintgrün, ein tiefes Bordeaux oder ein elegantes Taubengrau stehen Ihnen hervorragend. Probieren Sie sich durch unser Sortiment und finden Sie Ihre persönliche Lieblingsfarbe, denn Ihnen sind kaum Grenzen gesetzt!
        </p>
      </>
    )
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = mockBlogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full bg-white text-black flex-1">
      <article className="max-w-[1200px] mx-auto px-4 md:px-8 py-0 md:py-12">
        {/* Featured Image */}
        <div className="mb-8 md:mb-16 w-full flex justify-center">
          <div className="relative w-full max-w-[1100px] aspect-square md:aspect-video overflow-hidden rounded-xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
        </div>

        {/* Article Content Wrapper */}
        <div className="max-w-[850px] mx-auto">
          {/* Header */}
          <header className="mb-10 text-center">
            <div className="text-gray-500 text-sm tracking-widest uppercase mb-4 font-medium flex items-center justify-center gap-1 flex-wrap">
              <span>Posted by {post.author}</span>
              <span className="hidden sm:inline"> | </span>
              <span>on {post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black tracking-wide leading-tight mb-8">
              {post.title}
            </h1>
          </header>

          {/* Body */}
          <div className="prose prose-lg max-w-none text-gray-800 font-light leading-relaxed">
            {post.content}
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 pb-16 text-center">
            <p className="text-sm font-medium tracking-widest uppercase mb-6 text-gray-500">Share this article</p>
            <div className="flex justify-center items-center gap-4">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=https://yourstore.com/blogs/news/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-black hover:bg-black hover:text-white transition-colors group"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5 fill-current group-hover:fill-white" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/invertadigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-black hover:bg-black hover:text-white transition-colors group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current group-hover:fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@invertadigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-black hover:bg-black hover:text-white transition-colors group"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current group-hover:fill-white" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Blog Posts Section */}
      <div className="mt-8 border-t border-gray-100">
        <BlogPostsSection title="ALLE BLOGBEITRÄGE" />
      </div>
       <NewsletterSection />
    </div>
  );
}
