const projects = {
  'kravebeauty': {
    key:'krave', brand:'KraveBeauty', product:'The Daily Serum', category:'Beauty Marketing', role:'Marketing Intern',
    accent:'#A6BA36', soft:'#edf3ca', next:'for-the-plot',
    intro:'Supporting beauty marketing through creator relationships, competitive research, community engagement, and thoughtful brand experiences.',
    description:'At KraveBeauty, I support the marketing team across influencer gifting, PR, consumer and competitor research, community engagement, and experiential ideation.',
    work:[
      'Coordinated elements of creator and PR gifting, including outreach lists, product mailers, and personalized notes.',
      'Researched beauty and lifestyle brands to uncover insights in positioning, storytelling, social content, and activations.',
      'Supported community interactions, event planning ideas, and early-stage product launch discussions.'
    ],
    metrics:[['PR','Creator relations'],['Research','Brand insights'],['Community','Audience engagement']],
    outcome:'A cross-functional look at how beauty brands create community and translate their values into campaigns and customer experiences.'
  },
  'for-the-plot': {
    key:'ftp', brand:'For The Plot NYC', product:'The Social Mist', category:'Community & Events', role:'Founder, Social & Community Lead',
    accent:'#DD6A29', soft:'#ffe6d4', next:'content-creation',
    intro:'Built a real-world social community from the ground up, using content, partnerships, and experiences to turn online attention into in-person connection.',
    description:'For The Plot NYC is a community-driven social club I founded and grew through original content, local partnerships, and experiences that made it easier for new New Yorkers to connect.',
    work:[
      'Built and developed the brand identity, social presence, and voice of the community.',
      'Planned and promoted events, coordinated venues, and cultivated brand and sponsor relationships.',
      'Created social content that invited people to connect offline and become part of an ongoing community.'
    ],
    metrics:[['6.7K+','Instagram followers'],['50+','Community events'],['45','Brand sponsors']],
    outcome:'Community growth is strongest when digital content gives people a meaningful reason to show up in real life.'
  },
  'content-creation': {
    key:'creator', brand:'Content Creation', product:'The Signature Gloss', category:'Creator & Storytelling', role:'Digital Content Creator',
    accent:'#C8769B', soft:'#f8e0eb', next:'circle-hospitality',
    intro:'Creating short-form videos and brand stories with a strong sense of personality, audience, and culture.',
    description:'My personal creator work gives me a direct perspective on what makes people pause, watch, comment, share, and connect with brands.',
    work:[
      'Developed short-form video concepts and produced content for a personal TikTok audience.',
      'Collaborated with brands and local businesses on creator-led storytelling.',
      'Used audience response and platform performance to shape content direction and creative decisions.'
    ],
    metrics:[['200K+','TikTok followers'],['4.5M','Total likes'],['60','Brand & business collaborations']],
    outcome:'The strongest content feels native to its platform without losing a distinctive voice.'
  },
  'circle-hospitality': {
    key:'circle', brand:'Circle Hospitality', product:'The After-Hours Fragrance', category:'Social Media & Brand Growth', role:'Marketing Coordinator',
    accent:'#6E666B', soft:'#e6e0e1', next:'jefferies',
    intro:'Connecting restaurants, neighborhood culture, and social storytelling through distinctive digital experiences.',
    description:'At Circle Hospitality, I work on social media and brand growth, with a focus on restaurant content and a Koreatown-centered discovery concept.',
    work:[
      'Develop social media ideas and content for hospitality audiences, including restaurant-focused storytelling.',
      'Support social media planning and creative direction across Instagram and TikTok.',
      'Explore how local culture, food, and neighborhood discovery can build community around hospitality brands.'
    ],
    metrics:[['IG','Restaurant marketing'],['TikTok','Content development'],['NYC','Neighborhood storytelling']],
    outcome:'An ongoing role. Campaign examples and results can be added here as projects launch and become shareable.'
  },
  'jefferies': {
    key:'jefferies', brand:'Jefferies', product:'The Overnight Repair Cream', category:'Analytics & Strategic Thinking', role:'Business Intelligence Analyst',
    accent:'#0D2C58', soft:'#e0e8f3', next:'kravebeauty',
    intro:'The analytical foundation behind my creative approach: clear reporting, streamlined processes, and insights people can act on.',
    description:'In business intelligence at Jefferies, I worked with teams to improve access to reporting, automate repetitive work, and make complex information more usable.',
    work:[
      'Developed Power BI reporting dashboards for cross-functional teams and stakeholders.',
      'Built and maintained Excel, SQL, and ETL-based workflows that streamlined recurring reporting.',
      'Worked with operational and compliance partners on analytics, data validation, and process improvements.'
    ],
    metrics:[['15+','Power BI dashboards'],['20+','Reporting automations'],['50+','Dashboard users']],
    outcome:'Useful analytics starts with understanding the audience, simplifying complex information, and communicating what matters.'
  }
};

const appStage = document.getElementById('immersive-stage');
const cabinet = document.getElementById('cabinet-content');
const pageView = document.getElementById('page-view');
const closeButton = document.getElementById('close-cabinet');
const mobileShelf = document.getElementById('mobile-shelf');
const openButton = document.getElementById('explore-button');
let openTimer = null;
let isOpening = false;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const bottleTypes = {krave:'SERUM', ftp:'MIST', creator:'GLOSS', circle:'FRAGRANCE', jefferies:'CREAM'};
const brandLogos = {
  krave:'<img class="brand-logo krave-logo" src="assets/krave-wordmark-transparent.png" alt="" />',
  ftp:'<img class="brand-logo ftp-logo" src="assets/ftp-wordmark-transparent.png" alt="" />',
  creator:'<span class="brand-logo creator-monogram">NL</span>',
  circle:'<img class="brand-logo circle-logo" src="assets/circle-white.png" alt="" />',
  jefferies:'<img class="brand-logo jefferies-logo" src="assets/jefferies-white.png" alt="" />'
};
function productBottle(p) {
  return `<div class="bottle ${p.key}" aria-hidden="true"><span class="bottle-label">${brandLogos[p.key]}</span><span class="bottle-sub">${bottleTypes[p.key]}</span></div>`;
}
mobileShelf.innerHTML = Object.entries(projects).map(([slug,p]) => `
<button class="mobile-product-card" data-route="project/${slug}" aria-label="Open ${p.brand} case study">
  ${productBottle(p)}
</button>`).join('');

document.getElementById('copyright-year').textContent = new Date().getFullYear();

function navigate(route) {
  window.location.hash = '#/' + route;
  if (window.location.hash.slice(2) === route) render();
}

function beginOpening() {
  if (isOpening) return;
  isOpening = true;
  cabinet.classList.add('is-visible');
  cabinet.setAttribute('aria-hidden','false');
  appStage.classList.add('is-opening');
  clearTimeout(openTimer);
  openButton.disabled = true;
  openTimer = window.setTimeout(() => {
    isOpening = false;
    openButton.disabled = false;
    appStage.classList.remove('is-opening');
    appStage.classList.add('is-open');
    cabinet.inert = false;
    window.location.hash = '#/cabinet';
    const target = document.querySelector('.krave-hotspot');
    if (window.innerWidth > 950) target?.focus({preventScroll:true});
    else document.querySelector('.mobile-product-card')?.focus({preventScroll:true});
  }, prefersReducedMotion ? 20 : 1260);
}

openButton.addEventListener('click', beginOpening);
closeButton.addEventListener('click', () => navigate('home'));
document.addEventListener('click',(event) => {
  const target = event.target.closest('[data-route]');
  if (!target) return;
  event.preventDefault();
  const destination = target.dataset.route;
  if (destination === 'cabinet' && !appStage.hidden && !appStage.classList.contains('is-open')) beginOpening();
  else navigate(destination);
});
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href="#ab-story"]');
  if (!link) return;

  event.preventDefault();

  document.getElementById('ab-story')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});
window.addEventListener('hashchange', render);

function header() {
  return `<header class="page-nav">
    <a class="wordmark" href="#/home" aria-label="Natalie Lui home">Natalie Lui</a>
    <nav class="page-nav-links" aria-label="Primary navigation">
      <button data-route="cabinet">Work</button><button data-route="about">About</button><button data-route="resume">Resume</button><button data-route="contact">Contact</button>
    </nav>
  </header>`;
}
function ftpImg(name, alt, cls='', loading='lazy') {
  return `<img class="${cls}" src="assets/ftp-work/${name}.webp" alt="${alt}" loading="${loading}" decoding="async"/>`;
}
function ftpTemplate() {
  const p = projects['for-the-plot'];
  return `${header()}
  <main class="ftp-case" id="primary-content">
    <div class="ftp-container">
      <button class="back-link ftp-back" data-route="cabinet">← Back to the cabinet</button>
      <div class="ftp-topline"><span>THE PORTFOLIO COLLECTION / 02 OF 05</span><span>FOUNDER · BRAND & COMMUNITY</span></div>
      <section class="ftp-hero">
        <div class="ftp-hero-copy">
          <div class="ftp-pill"><span class="ftp-dot"></span> ORIGINAL COMMUNITY BRAND · NYC</div>
          <h1>For The<br/><em>Plot NYC.</em></h1>
          <p class="ftp-tagline">Making a big city feel <em>a little smaller.</em></p>
          <p class="ftp-summary">What started as a breakfast meetup became a community-led social club helping young professionals in New York connect through shared experiences, recurring rituals, and real-life friendships.</p>
          <div class="ftp-chips"><span>Brand Strategy</span><span>Social Content</span><span>Experiential Marketing</span><span>Partnerships</span></div>
          <p class="ftp-role"><strong>My role</strong> Founder &amp; Social / Community Lead <span>·</span> 2024–2026</p>
        </div>
        <div class="ftp-hero-visual">
          ${ftpImg('anniversary-party','A bustling For The Plot community celebration','ftp-hero-photo','eager')}
          <span class="ftp-visual-stamp">THE PLAN<br/>ALREADY<br/>EXISTS ↗</span>
          <div class="ftp-visual-caption">REAL PEOPLE. REAL PLANS. REAL CONNECTIONS.</div>
        </div>
      </section>
      <section class="ftp-metric-strip" aria-label="For The Plot metrics">
        <div><strong>6.7K+</strong><span>organic Instagram followers</span></div>
        <div><strong>50+</strong><span>events produced</span></div>
        <div><strong>45</strong><span>brand partnerships</span></div>
        <div><strong>65+</strong><span>business relationships</span></div>
        <div><strong>515</strong><span>attendees at largest event</span></div>
        <div><strong>$15.9K</strong><span>one-year anniversary profit</span></div>
      </section>
      <section class="ftp-story ftp-section">
        <div class="ftp-section-label">01 — THE WHY</div>
        <div><h2>The hardest part of meeting people<br/>was <em>showing up.</em></h2><p>People were moving to New York and still feeling like strangers. Most social clubs revolved around one hobby or niche, but I wanted a brand that made connection the common interest. For The Plot removed the friction of the first hello: the plan already existed; all you had to do was come.</p><p>I built the voice and visual identity, created a content calendar to drive signups, managed partnerships and venues, produced events from ideation through the door, and used attendance and social metrics to inform what came next.</p></div>
      </section>
      <section class="ftp-section ftp-selected" id="ftp-selected">
        <div class="ftp-section-kicker"><span>02 — BUILDING THE BRAND</span><span>SELECTED CREATIVE WORK</span></div>
        <h2>Creative that makes <em>showing up</em> feel easy.</h2>
        <p class="ftp-intro">From event posters to monthly programming calendars, I created the assets and tone of voice that turned the community's plans into recognizable, approachable invitations.</p>
        <div class="ftp-poster-grid">
          <figure class="ftp-poster ftp-poster-large">${ftpImg('bouquet-swap','For The Plot Bouquet Swap illustrated campaign poster')}<figcaption>EVENT CAMPAIGN / BOUQUET SWAP</figcaption></figure>
          <figure class="ftp-poster">${ftpImg('hoka-race','Race for the Plot collaborative event flyer with HOKA')}<figcaption>COLLABORATION / RACE FOR THE PLOT</figcaption></figure>
          <figure class="ftp-poster">${ftpImg('dance-flyer','Blue Dance and Mingle event announcement')}<figcaption>EVENT PROMOTION / DANCE &amp; MINGLE</figcaption></figure>
          <figure class="ftp-poster">${ftpImg('anniversary-poster','For The Plot one-year anniversary celebration promotional artwork')}<figcaption>MILESTONE / ONE-YEAR ANNIVERSARY</figcaption></figure>
        </div>
      </section>
      <section class="ftp-section ftp-editorial">
        <div class="ftp-section-kicker"><span>03 — THE CONTENT ENGINE</span><span>RECURRING PROGRAMMING</span></div>
        <div class="ftp-editorial-head"><h2>Not just a one-time event.<br/><em>A reason to come back.</em></h2><p>I used monthly programming and distinct creative themes to give followers regular opportunities to participate, while tracking responses and attendance to refine future events.</p></div>
        <div class="ftp-calendar-grid">
          <figure>${ftpImg('event-calendar-september','September event lineup designed as a scrapbook corkboard')}<figcaption>SEPTEMBER — COMMUNITY EVENT ROUNDUP</figcaption></figure>
          <figure>${ftpImg('event-calendar-october','October event lineup designed as a themed scrapbook corkboard')}<figcaption>OCTOBER — SEASONAL EVENT ROUNDUP</figcaption></figure>
        </div>
      </section>
      <section class="ftp-section ftp-life">
        <div class="ftp-section-kicker"><span>04 — THE EXPERIENCE</span><span>FROM FEED TO REAL LIFE</span></div>
        <h2>The real work happened <em>offline.</em></h2>
        <p class="ftp-intro">I led event concepts, venue and vendor coordination, ticketing, promotion, and day-of logistics — designing experiences where people could move from online interest to meaningful real-world connection.</p>
        <div class="ftp-photo-grid">
          <figure class="ftp-wide">${ftpImg('rooftop-community','For The Plot community members gathered outdoors in New York')}<figcaption>THE COMMUNITY / OUTDOOR MEETUP</figcaption></figure>
          <figure>${ftpImg('creative-workshop','For The Plot participants doing crafts around a studio table')}<figcaption>CREATIVE WORKSHOPS</figcaption></figure>
          <figure>${ftpImg('group-brunch','For The Plot community gathered for a group meetup')}<figcaption>SMALL-GROUP CONNECTIONS</figcaption></figure>
          <figure>${ftpImg('fitness-class','For The Plot attendees posing after a group workout')}<figcaption>WELLNESS &amp; SHARED EXPERIENCES</figcaption></figure>
          <figure>${ftpImg('social-community','For The Plot attendees smiling together at a nightlife event')}<figcaption>COMMUNITY MOMENTS</figcaption></figure>
        </div>
      </section>
      <section class="ftp-section ftp-collab">
        <div class="ftp-section-kicker"><span>05 — PARTNERSHIPS</span><span>65+ BUSINESSES / 45 BRANDS</span></div>
        <div class="ftp-collab-layout"><div><h2>Better experiences,<br/><em>built together.</em></h2><p>From co-branded promotions and venue relationships to gifting, sponsorships, and giveaways, I cultivated partnerships that added value to each community gathering.</p><p>These collaborations combined audience relevance with on-the-ground execution — giving partners a meaningful role in the experience rather than a logo placement alone.</p></div>
          <div class="ftp-collab-images"><figure>${ftpImg('brand-gifting','Event attendee holding a bright green brand gifting tote')}<figcaption>PARTNER GIFTING &amp; ACTIVATIONS</figcaption></figure><figure>${ftpImg('1year-photos','Polaroid collage of For The Plot community moments')}<figcaption>COMMUNITY &amp; CONTENT</figcaption></figure></div></div>
      </section>
      <section class="ftp-section ftp-reflection">
        <div class="ftp-section-kicker"><span>06 — LESSONS LEARNED</span><span>WHAT I'D DO DIFFERENTLY</span></div>
        <h2>From sold-out rooms to<br/><em>sustainable growth.</em></h2>
        <div class="ftp-lessons"><article><span>01 / FINANCIAL DISCIPLINE</span><h3>A full room isn't the same as a profitable event.</h3><p>I initially priced events on instinct. I learned to build a cost model before launching, looking at venue fees, vendor costs, tickets, and realistic attendance to make programming more sustainable.</p></article><article><span>02 / AUDIENCE OWNERSHIP</span><h3>Build direct community relationships early.</h3><p>If I started again, I'd collect email addresses from day one rather than depending solely on Instagram's algorithm to reach the same people twice.</p></article></div>
        <div class="ftp-pullquote">“The plan already exists.<br/>All you have to do is come.”</div>
      </section>
      <div class="next-project ftp-next"><span class="eyebrow">UP NEXT IN THE CABINET</span><button data-route="project/content-creation">Content Creation ↗</button></div>
    </div>
  </main>`;
}

function circleTemplate() {
  const clips = [
    {id:'hook-pov',title:'The playful invitation',type:'POV / humorous hook',desc:'A direct, lighthearted text hook turns a Korean barbecue table into an invitation to watch.'},
    {id:'food-montage',title:'Let the food do the talking',type:'Sensory / food-first',desc:'Close-ups of grilling, side dishes, and serving moments create a food-focused, texture-rich edit.'},
    {id:'neighborhood-hook',title:'A Koreatown-specific moment',type:'Local culture / trend adaptation',desc:'A conversational, 32nd Street reference puts the restaurant in the cultural context of NYC Koreatown.'},
    {id:'happier-lately',title:'The reveal',type:'Relatable / personality-led',desc:'A familiar conversational setup builds to the restaurant as the punchline, emphasizing a feeling over a hard sell.'},
    {id:'bagel-contrast',title:'A choice worth making',type:'Contrast / attention hook',desc:'A cheeky opening line followed by sizzling meat uses contrast and satisfying visuals to hold attention.'}
  ];
  const card = (v,i) => `<article class="ch-clip-card ${i===0?'ch-clip-featured':''}">
      <div class="ch-media"><video controls preload="none" playsinline poster="assets/circle-work/${v.id}.webp" aria-label="Play ${v.title} video"><source src="assets/circle-work/${v.id}.mp4" type="video/mp4" />Your browser cannot play this video.</video></div>
      <div class="ch-card-copy"><span class="ch-number">${String(i+1).padStart(2,'0')} / ${v.type}</span><h3>${v.title}</h3><p>${v.desc}</p></div>
    </article>`;
  return `${header()}
   <main class="circle-case" id="primary-content">
    <div class="ch-wrap">
      <button class="back-link ch-back" data-route="cabinet">← Back to the cabinet</button>
      <div class="ch-meta"><span>THE PORTFOLIO COLLECTION / 04 OF 05</span><span>EARLY-STAGE WORK · NOVEMBER 2026</span></div>
      <section class="ch-hero" aria-labelledby="circle-title">
        <div class="ch-hero-copy">
          <span class="ch-eyebrow">CIRCLE HOSPITALITY GROUP / MARKETING COORDINATOR</span>
          <h1 id="circle-title">Circle<br/><em>Hospitality.</em></h1>
          <p class="ch-hero-statement">Make dinner the main character.</p>
          <p class="ch-dek">Exploring how food, humor, and local culture can make a Korean barbecue restaurant part of someone's feed — and maybe their next night out.</p>
          <div class="ch-tags"><span>Social Media Content</span><span>Short-Form Video</span><span>Hospitality Marketing</span><span>Creative Testing</span></div>
          <p class="ch-role"><strong>Company</strong> Circle Hospitality Group <b>·</b> <strong>Featured brand</strong> Ahgassi Gopchang <b>·</b> <strong>Started</strong> November 3, 2026</p>
        </div>
        <div class="ch-hero-visual"><img src="assets/circle-work/food-montage.webp" alt="Close-up Korean barbecue content from Ahgassi Gopchang" /><div class="ch-hero-line">CONTENT THAT MAKES YOU CRAVE THE EXPERIENCE.</div></div>
      </section>
      <section class="ch-role-section">
        <div class="ch-heading-side"><span>01 — MY ROLE</span><h2>Where storytelling<br/>meets <em>hospitality.</em></h2></div>
        <div class="ch-role-body"><p>As a Marketing Coordinator at Circle Hospitality Group, I support social media and brand storytelling for its hospitality concepts. My early work includes developing and editing short-form videos that spotlight Ahgassi Gopchang's Korean barbecue experience.</p>
          <p>I explore different creative openings — from relatable captions to food-first montages — while keeping the visuals centered on the restaurant's food and Koreatown context.</p>
          <div class="ch-responsibilities"><span>CONTRIBUTIONS TO DATE</span><ul><li>Developing short-form content concepts and on-screen storytelling</li><li>Editing vertical videos to suit social discovery and mobile viewing</li><li>Exploring different messaging angles using similar food footage</li><li>Supporting the brand's evolving Instagram and TikTok content direction</li></ul></div>
        </div>
      </section>
      <section class="ch-selection">
        <div class="ch-section-bar"><span>02 — SELECTED WORK</span><span>5 FEATURED SHORT-FORM EDITS</span></div>
        <h2>Same table.<br/><em>Five different hooks.</em></h2>
        <p class="ch-section-intro">These early pieces use overlapping restaurant footage with different editing and caption choices. Rather than treating them as five separate campaigns, this selection shows how I experiment with framing a familiar dining experience for social audiences.</p>
        <div class="ch-clip-grid">${clips.map(card).join('')}</div>
        <p class="ch-rights">Private portfolio draft: original clips are shown for review. Confirm music, footage, and employer permissions before publishing or distributing the videos.</p>
      </section>
      <section class="ch-approach">
       <div class="ch-section-bar"><span>03 — THE CREATIVE THINKING</span><span>EARLY CREATIVE EXPLORATION</span></div>
       <div class="ch-approach-layout"><div><h2>The hook changes<br/><em>the feeling.</em></h2><p>Within seconds, a clip can feel like an invitation, a joke, a neighborhood recommendation, or a food craving. My early approach is to test those different entry points while the food itself remains the visual anchor.</p></div>
         <div class="ch-approach-list"><div><span>01 / DISCOVERY</span><p>Use simple, recognizable social formats to earn a pause in the feed.</p></div><div><span>02 / SENSORY DETAIL</span><p>Let the grill, movement, and close-up texture communicate the experience.</p></div><div><span>03 / LOCAL RELEVANCE</span><p>Connect the story to Koreatown and the context of a night out in NYC.</p></div></div></div>
      </section>
      <section class="ch-closing"><span>WORK IN PROGRESS / CURRENT ROLE</span><h2>Building the next chapter,<br/><em>one post at a time.</em></h2><p>I joined Circle Hospitality in November 2026, so this case study focuses on the creative work I can show today. As more content is published and performance data becomes available, I'll expand it with tested learnings and measurable results.</p></section>
      <div class="next-project ch-next"><span class="eyebrow">UP NEXT IN THE CABINET</span><button data-route="project/jefferies">Jefferies ↗</button></div>
    </div>
   </main>`;
}

function jefferiesTemplate() {
  return `  <main class="jf-case" id="primary-content">
    <div class="jf-wrap">
      <button class="back-link jf-back" data-route="cabinet" type="button">← Back to the cabinet</button>
      <div class="jf-page-meta"><span>THE PORTFOLIO COLLECTION / 05 OF 05</span><span>ANALYTICS &amp; STRATEGIC THINKING</span></div>

      <section class="jf-hero" aria-labelledby="jf-title">
        <div class="jf-hero-copy">
          <div class="jf-eyebrow">BUSINESS INTELLIGENCE · FINANCIAL SERVICES</div>
          <h1 id="jf-title">Jefferies<span class="jf-period">.</span></h1>
          <p class="jf-hero-heading">Turning complex data into <em>clearer decisions.</em></p>
          <p class="jf-hero-description">Before moving into marketing, I spent more than three years building reporting solutions, automating processes, and translating financial data into useful business intelligence.</p>
          <div class="jf-tags"><span>Power BI</span><span>SQL</span><span>Excel &amp; VBA</span><span>Pentaho</span></div>
          <p class="jf-role"><strong>Business Intelligence Analyst</strong> <span>·</span> June 2022 – September 2025</p>
        </div>
        <div class="jf-hero-art" aria-hidden="true">
           <div class="jf-orbit jf-orbit-1"></div><div class="jf-orbit jf-orbit-2"></div><div class="jf-orbit jf-orbit-3"></div>
           <div class="jf-art-card jf-art-card-a"><div class="jf-mini-label">DATA PIPELINES</div><div class="jf-mini-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
           <div class="jf-art-card jf-art-card-b"><div class="jf-mini-label">BUSINESS INTELLIGENCE</div><svg viewBox="0 0 300 110" role="presentation"><path d="M10 85 C50 68 67 89 94 63 S147 65 166 45 S230 57 290 16" fill="none" stroke="#b9cce5" stroke-width="3"/><path d="M10 85 C50 68 67 89 94 63 S147 65 166 45 S230 57 290 16 L290 105 L10 105 Z" fill="#93b0d1" opacity=".18"/></svg></div>
           <div class="jf-art-caption">CLARITY / STRUCTURE / IMPACT</div>
        </div>
      </section>

      <section class="jf-overview jf-section">
        <div class="jf-section-key">01 / ABOUT THE ROLE</div>
        <div><h2>Making data <em>work harder.</em></h2>
          <p>I worked in business intelligence at Jefferies, developing reporting tools and workflows for a data-intensive financial environment. My responsibilities covered dashboard development, SQL-based analysis, process automation, data validation, and collaboration with business and technical stakeholders.</p>
          <p>The goal was straightforward: make complex information more accessible, improve reporting reliability, and give people the information they needed to do their jobs effectively.</p>
        </div>
      </section>

      <section class="jf-section jf-approach">
        <div class="jf-section-key">02 / WHAT I WORKED ON</div>
        <h2>From data to <em>decisions.</em></h2>
        <div class="jf-capabilities">
          <article><span>01</span><h3>BI &amp; dashboard development</h3><p>Designed and maintained Power BI reporting tools that made operational information easier to monitor, explore, and understand.</p></article>
          <article><span>02</span><h3>SQL &amp; data analysis</h3><p>Queried, transformed, and validated financial datasets to support accurate reporting and problem-solving.</p></article>
          <article><span>03</span><h3>Reporting automation</h3><p>Used SQL, Excel, VBA, and Pentaho to streamline recurring reporting processes and reduce manual work.</p></article>
          <article><span>04</span><h3>Cross-functional collaboration</h3><p>Worked with operations, technology, and compliance partners on reporting requirements, troubleshooting, testing, and systems support.</p></article>
        </div>
      </section>

      <section class="jf-section jf-toolkit">
        <div class="jf-section-key">03 / TECHNICAL TOOLKIT</div>
        <div class="jf-toolkit-grid">
          <div><h2>The tools behind<br/><em>the work.</em></h2><p>My background combines hands-on data work with an understanding of how teams use reporting in practice.</p></div>
          <div class="jf-tool-list">
            <div><strong>Power BI</strong><span>Dashboards, data visualization, reporting</span></div>
            <div><strong>SQL</strong><span>Querying, validation, data transformation</span></div>
            <div><strong>Excel &amp; VBA</strong><span>Analysis, advanced reporting, automation</span></div>
            <div><strong>Pentaho</strong><span>ETL pipelines and reporting workflows</span></div>
          </div>
        </div>
        <p class="jf-etl-note"><strong>ETL</strong> means <strong>Extract, Transform, Load</strong>: gathering data from source systems, preparing it for use, and loading it into a reporting destination.</p>
      </section>

      <section class="jf-section jf-dashboard-section" id="jf-dashboard">
        <div class="jf-section-key">04 / INDEPENDENT DEMONSTRATION</div>
        <div class="jf-dash-heading"><div><h2>An illustrative <em>BI dashboard.</em></h2><p>To show my approach without exposing internal information, I created a generic operational-reporting concept using entirely fictional data. This is an independent portfolio demonstration, not a Jefferies dashboard.</p></div><div class="jf-synthetic-stamp">100% SYNTHETIC DATA</div></div>
        <div class="jf-dashboard" aria-label="Illustrative reporting dashboard containing only fictional sample data">
          <header class="jf-dash-header">
            <div><span class="jf-dash-overline">PORTFOLIO DEMONSTRATION / OPERATIONS</span><h3>Operational Reporting Overview</h3><p>Sample reporting environment · January–June 2026</p></div>
            <span class="jf-dash-demo">DEMO DATA</span>
          </header>
          <div class="jf-kpi-grid">
            <article><span>Sample dashboards</span><strong>18</strong><small>Illustrative portfolio count</small></article>
            <article><span>Scheduled reports</span><strong>24</strong><small>Illustrative portfolio count</small></article>
            <article><span>Example users</span><strong>52</strong><small>Synthetic user population</small></article>
            <article><span>Refresh success</span><strong>98.4%</strong><small>Synthetic service metric</small></article>
          </div>
          <div class="jf-charts">
            <section class="jf-panel jf-panel-volume"><div class="jf-panel-top"><h4>Reporting volume</h4><span>MONTHLY / SAMPLE</span></div><svg class="jf-line-svg" viewBox="0 0 700 265" role="img" aria-label="Illustrative monthly report volumes rising from 84 in January to 109 in June. Synthetic data.">
  <defs><linearGradient id="jfChartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#85a5d6" stop-opacity=".28"/><stop offset="100%" stop-color="#85a5d6" stop-opacity="0"/></linearGradient></defs>
  <g class="jf-chart-grid"><line x1="52" y1="64" x2="665" y2="64"/><line x1="52" y1="138" x2="665" y2="138"/><line x1="52" y1="212" x2="665" y2="212"/></g>
  <g class="jf-tick-values"><text x="8" y="69">110</text><text x="16" y="143">90</text><text x="16" y="217">70</text></g>
  <path d="M52.0 160.2 L172.0 145.4 L292.0 134.3 L412.0 119.5 L532.0 93.6 L652.0 67.7 L 652 212 L 52 212 Z" fill="url(#jfChartFill)"/><path d="M52.0 160.2 L172.0 145.4 L292.0 134.3 L412.0 119.5 L532.0 93.6 L652.0 67.7" class="jf-trend-path"/>
  <circle class="jf-chart-point" cx="52.0" cy="160.2" r="4.5"><title>JAN: 84 sample reports</title></circle><circle class="jf-chart-point" cx="172.0" cy="145.4" r="4.5"><title>FEB: 88 sample reports</title></circle><circle class="jf-chart-point" cx="292.0" cy="134.3" r="4.5"><title>MAR: 91 sample reports</title></circle><circle class="jf-chart-point" cx="412.0" cy="119.5" r="4.5"><title>APR: 95 sample reports</title></circle><circle class="jf-chart-point" cx="532.0" cy="93.6" r="4.5"><title>MAY: 102 sample reports</title></circle><circle class="jf-chart-point" cx="652.0" cy="67.7" r="4.5"><title>JUN: 109 sample reports</title></circle>
  <g class="jf-month-labels"><text x="52" y="246" text-anchor="middle">JAN</text><text x="172" y="246" text-anchor="middle">FEB</text><text x="292" y="246" text-anchor="middle">MAR</text><text x="412" y="246" text-anchor="middle">APR</text><text x="532" y="246" text-anchor="middle">MAY</text><text x="652" y="246" text-anchor="middle">JUN</text></g>
</svg><p class="jf-panel-desc">A simple operational view of reporting demand over time.</p></section>
            <section class="jf-panel jf-panel-requests"><div class="jf-panel-top"><h4>Request mix</h4><span>% OF SAMPLE REQUESTS</span></div>
              <div class="jf-bars">
                <div><label>Dashboard enhancements <b>32%</b></label><span style="--pct:32%"></span></div>
                <div><label>Automated reporting <b>27%</b></label><span style="--pct:27%"></span></div>
                <div><label>Ad hoc analysis <b>18%</b></label><span style="--pct:18%"></span></div>
                <div><label>Data validation <b>13%</b></label><span style="--pct:13%"></span></div>
                <div><label>Testing support <b>10%</b></label><span style="--pct:10%"></span></div>
              </div>
            </section>
            <section class="jf-panel jf-panel-efficiency"><div class="jf-panel-top"><h4>Process efficiency</h4><span>TIME PER TASK / MINUTES</span></div>
              <div class="jf-legend"><span><i class="jf-before"></i>Before</span><span><i class="jf-after"></i>After</span></div>
              <div class="jf-comparison">
                <div><label>Manual reporting</label><div class="jf-paired"><span class="jf-bar-before" style="--w:100%"><b>120</b></span><span class="jf-bar-after" style="--w:29.2%"><b>35</b></span></div></div>
                <div><label>Data preparation</label><div class="jf-paired"><span class="jf-bar-before" style="--w:62.5%"><b>75</b></span><span class="jf-bar-after" style="--w:25%"><b>30</b></span></div></div>
                <div><label>Validation cycle</label><div class="jf-paired"><span class="jf-bar-before" style="--w:37.5%"><b>45</b></span><span class="jf-bar-after" style="--w:16.7%"><b>20</b></span></div></div>
              </div><p class="jf-panel-desc">Fictional before-and-after times demonstrate how workflow improvements can be measured.</p>
            </section>
            <section class="jf-panel jf-panel-pipeline"><div class="jf-panel-top"><h4>Reporting workflow</h4><span>CONCEPTUAL PROCESS</span></div>
             <div class="jf-pipeline"><div><span>01</span><strong>Extract</strong><small>Source data</small></div><b aria-hidden="true">→</b><div><span>02</span><strong>Transform</strong><small>SQL / ETL</small></div><b aria-hidden="true">→</b><div><span>03</span><strong>Validate</strong><small>Quality checks</small></div><b aria-hidden="true">→</b><div><span>04</span><strong>Report</strong><small>BI output</small></div></div>
             <p class="jf-panel-desc">A generic illustration of how data moves from raw inputs to decision-ready reporting.</p>
            </section>
          </div>
          <footer class="jf-dashboard-footer"><strong>Illustrative demonstration only.</strong> All metrics, charts, workflows, and figures are synthetic. This is not a reproduction of Jefferies data, systems, or reports.</footer>
        </div>
      </section>

      <section class="jf-reflection jf-section">
        <div class="jf-section-key">05 / WHAT I LEARNED</div>
        <div><h2>Structure makes room<br/>for <em>creativity.</em></h2><p>Jefferies taught me to understand a business problem before building a solution, communicate complicated information clearly, and evaluate whether a process actually works.</p><p>That perspective shapes how I approach marketing today. I connect creative ideas to audience understanding, performance data, and measurable objectives — pairing storytelling with a strong analytical foundation.</p></div>
      </section>
      <div class="next-project jf-next"><span class="eyebrow">BACK TO THE BEGINNING</span><button data-route="project/kravebeauty" type="button">KraveBeauty ↗</button></div>
    </div>
  </main>`;
}

function caseTemplate(slug) {
  const p = projects[slug];
  if(!p) return genericTemplate('Not found','That page is not in the cabinet yet.');
  const next = projects[p.next];
  return `${header()}
  <main class="page-wrap" id="primary-content" style="--accent:${p.accent};--accent-soft:${p.soft}">
    <button class="back-link" data-route="cabinet">← Back to the cabinet</button>
    <section class="case-hero" aria-labelledby="project-title">
      <div>
        <div class="eyebrow">THE PORTFOLIO COLLECTION · ${String(Object.keys(projects).indexOf(slug)+1).padStart(2,'0')} / 05</div>
        <h1 class="editorial-heading" id="project-title">${p.brand}</h1>
        <p class="lead">${p.intro}</p>
        <div class="case-badge">${p.role} <span aria-hidden="true">·</span> ${p.category}</div>
      </div>
      <div class="hero-product" role="img" aria-label="${p.product}, a ${p.brand} inspired beauty product illustration">${productBottle(p)}</div>
    </section>
    <section class="grid-section"><h2>The experience</h2><div><p>${p.description}</p><p><strong>Product metaphor:</strong> ${p.product}</p></div></section>
    <section class="grid-section"><h2>What I worked on</h2><div><ul>${p.work.map(item=>`<li>${item}</li>`).join('')}</ul></div></section>
    <section aria-label="Selected experience highlights"><div class="stats-row">${p.metrics.map(m=>`<div class="stat"><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join('')}</div></section>
    <section class="grid-section"><h2>My takeaway</h2><div><p>${p.outcome}</p></div></section>
    <aside class="notes-panel"><h3>Visual case study materials</h3><p>This is a starter layout. Add approved campaign visuals, screenshots, content examples, and project outcomes before publishing your final portfolio. Avoid sharing confidential internal materials without permission.</p></aside>
    <div class="next-project"><span class="eyebrow">UP NEXT IN THE CABINET</span><button data-route="project/${p.next}">${next.brand} ↗</button></div>
  </main>`;
}
function kraveTemplate(){
  const work = [
    {img:'violette-toc.webp',alt:'Selected table-of-contents excerpt from VIOLETTE_FR competitor research presentation',n:'01 / COMPETITIVE INTELLIGENCE',title:'Understanding the category',desc:'Developed competitive research spanning brand identity, product strategy, community, digital presence, partnerships, and experiential marketing — then considered implications for KraveBeauty.'},
    {img:'ooh-example.webp',alt:'Selected slide illustrating an interactive Tower 28 out-of-home campaign',n:'02 / CAMPAIGN RESEARCH',title:'Beyond the billboard',desc:'Studied out-of-home campaigns from beauty and lifestyle brands to identify creative formats that connect physical experiences with memorable brand storytelling.'},
    {img:'sustainable-pr.webp',alt:'Selected sustainable PR packaging research excerpt',n:'03 / SUSTAINABLE GIFTING',title:'Thoughtful PR experiences',desc:'Benchmarked creative and sustainability-minded mailers to inspire future influencer gifting concepts aligned with the brand’s values.'}
  ];
  const workCard = (w) => `<article class="kb-work-card"><div class="kb-work-image"><img src="assets/krave-work/${w.img}" alt="${w.alt}" loading="lazy" /></div><div class="kb-work-copy"><span>${w.n}</span><h3>${w.title}</h3><p>${w.desc}</p></div></article>`;
  return `${header()}<main class="kb-case" id="primary-content"><div class="kb-wrap">
    <button class="back-link kb-back" data-route="cabinet" type="button">← Back to the cabinet</button>
    <div class="kb-meta"><span>THE PORTFOLIO COLLECTION / 01 OF 05</span><span>BEAUTY MARKETING · SELECTED WORK</span></div>
    <section class="kb-hero" aria-labelledby="kb-heading">
      <div class="kb-hero-copy"><div class="kb-eyebrow">MARKETING INTERN · OCTOBER 2026 – PRESENT</div><h1 id="kb-heading">Krave<span>Beauty.</span></h1>
        <p class="kb-hero-lead">Where beauty meets research, community &amp; creative strategy.</p>
        <p class="kb-hero-text">Supporting the ideas, insights, and experiences that connect a skincare brand with its community — through creator partnerships, competitive research, and experiential marketing.</p>
        <div class="kb-pills"><span>Influencer &amp; PR</span><span>Consumer Insights</span><span>Brand Research</span><span>Experiential Marketing</span></div>
      </div>
      <div class="kb-hero-art" aria-hidden="true"><div class="kb-art-accent"></div><div class="kb-art-serum"><div class="kb-art-cap"></div><div class="kb-art-neck"></div><div class="kb-art-body"><img src="assets/krave-wordmark-transparent.png" alt=""/><span>SERUM</span></div></div><span class="kb-art-stamp">A CURATED COLLECTION<br/>OF RESEARCH &amp; IDEAS</span></div>
    </section>
    <section class="kb-role kb-section"><div class="kb-side-label">01 / ABOUT THE ROLE</div><div><h2>Research-led ideas.<br/><em>Community-first thinking.</em></h2><p>As a Marketing Intern, I support KraveBeauty’s brand initiatives across influencer marketing and PR, competitive and consumer research, community engagement, experiential concepts, and product-launch planning. My work ranges from scouting potential creators and preparing gifting mailers to developing research presentations that inform future marketing conversations.</p><p>I contribute to day-to-day campaign coordination while exploring how brands earn attention, build trust, and bring their values to life.</p></div></section>
    <section class="kb-section kb-pillars"><div class="kb-section-heading"><div class="kb-side-label">02 / MY RESPONSIBILITIES</div><h2>Across the <em>marketing mix.</em></h2></div>
      <div class="kb-pillar-grid"><article><span>01</span><h3>Influencer &amp; PR</h3><p>Creator scouting, recruitment support, creator lists, product gifting, personalized mailers, and sustainable packaging research.</p></article><article><span>02</span><h3>Consumer &amp; competitor research</h3><p>Reddit conversation analysis, competitive benchmarking, beauty-market research, and strategic presentation development.</p></article><article><span>03</span><h3>Creative &amp; experiential strategy</h3><p>OOH inspiration, monthly community event concepts, holiday pop-up research, and recommendations for future brand experiences.</p></article><article><span>04</span><h3>Cross-functional coordination</h3><p>Support for campaign planning, marketing projects, and discussions around upcoming product launches.</p></article></div>
    </section>
    <section class="kb-section kb-selected" id="kb-selected"><div class="kb-section-heading"><div class="kb-side-label">03 / SELECTED WORK</div><h2>From curiosity<br/>to <em>creative opportunity.</em></h2><p>A few visual excerpts from research projects I developed during my internship. The complete reports and internal recommendations are not published.</p></div><div class="kb-work-grid">${work.map(workCard).join('')}</div></section>
    <section class="kb-section kb-beyond"><div class="kb-side-label">04 / BEYOND THE SLIDES</div><div class="kb-beyond-layout"><div><h2>The research behind<br/><em>real experiences.</em></h2><p>Not every contribution needs a screenshot. These projects demonstrate how I approached audience understanding, creator relationships, and event planning.</p></div><div class="kb-beyond-list">
      <article><span>COMMUNITY LISTENING</span><h3>What people say when brands aren't in the room</h3><p>Reviewed Reddit conversations about KraveBeauty to surface recurring themes in consumer sentiment and brand perception.</p></article>
      <article><span>EXPERIENTIAL RESEARCH</span><h3>Waste Me Not Holiday Market</h3><p>Researched past holiday activations, sustainable bags, and event formats to support planning for the December 4–6, 2026 Manhattan pop-up.</p></article>
      <article><span>CREATOR DISCOVERY &amp; IDEATION</span><h3>People, partnerships, and programming</h3><p>Conducted an in-depth creator research project, scouted prospective partners, and developed monthly community event concepts.</p></article>
    </div></div></section>
    <section class="kb-section kb-reflection"><div class="kb-side-label">05 / MY APPROACH</div><div><h2>Creative ideas start<br/>with <em>better questions.</em></h2><p>Across my assignments, I focused on understanding what audiences respond to, learning from other brands, and turning those observations into relevant ideas — while keeping the brand’s values and community at the center.</p><p class="kb-privacy"><strong>Portfolio note:</strong> These are limited visual excerpts. Internal recommendations, private contacts, unpublished plans, and detailed research are intentionally excluded. Public use should be reviewed with the employer.</p></div></section>
    <div class="next-project kb-next"><span class="eyebrow">UP NEXT IN THE CABINET</span><button data-route="project/for-the-plot" type="button">For The Plot NYC ↗</button></div>
  </div></main>`;
}
function creatorTemplate(){
 const videos = [
  {title:'Pepero Day',type:'PERSONALITY / PRODUCT',desc:'A direct-to-camera seasonal hook that brings personality into a product-led story.'},
  {title:'NY Beauty Week Social House',type:'BEAUTY / EVENT COVERAGE',desc:'A fast-moving look at brand details, discovery moments, and the atmosphere of a beauty event.'},
  {title:'Skullpanda Pop-Up',type:'CULTURE / EXPERIENCE',desc:'A location-led walkthrough of a collectible brand pop-up.'},
  {title:'Bao’s Pastry Taste Test',type:'PERSONALITY / REVIEW',desc:'An extended, on-camera taste test with a personal point of view.'},
  {title:'16-Course Omakase',type:'FOOD / FAST EDITING',desc:'A structured, course-by-course visual walkthrough designed for quick discovery.'},
  {title:'Bua Thai Discovery',type:'NEIGHBORHOOD / STORYTELLING',desc:'A restaurant tour that moves from place and atmosphere into the food experience.'},
  {title:'TikTok Shop Event',type:'CREATORS / BRAND COMMERCE',desc:'Behind-the-scenes storytelling from a creator and commerce event.'}
 ];
 const videoCards = videos.map((v,i)=>{let id=String(i+1).padStart(2,'0');return `<article class="cr-video-card"><div class="cr-video-shell"><video controls playsinline preload="none" poster="assets/creator-work/poster-${id}.jpg" aria-label="Play ${v.title} video"><source src="assets/creator-work/clip-${id}.mp4" type="video/mp4"/>Your browser does not support embedded video.</video><span class="cr-video-num">${id} / 07</span></div><div class="cr-video-copy"><span>${v.type}</span><h3>${v.title}</h3><p>${v.desc}</p></div></article>`}).join('');
 return `${header()}<main class="cr-case" id="primary-content"><div class="cr-wrap">
 <button class="back-link cr-back" data-route="cabinet" type="button">← Back to the cabinet</button>
 <div class="cr-meta"><span>THE PORTFOLIO COLLECTION / 03 OF 05</span><span>INDEPENDENT CONTENT CREATOR · 2020 – PRESENT</span></div>
 <section class="cr-hero" aria-labelledby="cr-title"><div class="cr-hero-copy"><span class="cr-eyebrow">SHORT-FORM VIDEO / CREATIVE DIRECTION / BRAND PARTNERSHIPS</span><h1 id="cr-title">Content<br/><em>Creation.</em></h1><p class="cr-lead">Creating content that makes people <i>stop scrolling.</i></p><p class="cr-intro">Five years of self-produced short-form video — concept, script, film, edit, publish, read the numbers, and do it better.</p><div class="cr-tags"><span>TikTok</span><span>Instagram Reels</span><span>CapCut</span><span>Creator Partnerships</span></div></div><div class="cr-hero-art" aria-hidden="true"><div class="cr-gloss-shadow"></div><div class="cr-gloss"><div class="cr-gloss-cap"></div><div class="cr-gloss-tube"><strong>NL</strong><small>GLOSS</small></div></div><div class="cr-hero-scribble">YOUR<br/>SIGNATURE<br/>STORY ✳</div></div></section>
 <section class="cr-lifetime" aria-label="Creator milestones"><div><strong>200K+</strong><span>TikTok followers</span></div><div><strong>4.5M</strong><span>Lifetime TikTok likes</span></div><div><strong>2020</strong><span>Started creating</span></div></section>
 <section class="cr-section cr-story"><div class="cr-section-label">01 / THE STORY</div><div><h2>From quarantine clips<br/>to a <em>creative practice.</em></h2><p>I started posting during quarantine as a way to document life with my family and cats. What began as an outlet quickly grew into a real audience. Staying consistent taught me how to earn attention in the first two seconds — and why yesterday’s successful post never guarantees tomorrow’s.</p><p>Today I handle every stage of production. I develop ideas, script, film, edit in CapCut, repurpose content for Reels, create my own media kits, and negotiate partnerships with lifestyle and hospitality brands.</p></div></section>
 <section class="cr-section cr-process"><div class="cr-section-heading"><div class="cr-section-label">02 / THE CREATIVE PROCESS</div><h2>One person.<br/><em>Every step.</em></h2></div><div class="cr-process-grid"><article><span>01 / PLAN</span><h3>Idea &amp; hook</h3><p>Find the point of view, write the concept, and earn attention early.</p></article><article><span>02 / MAKE</span><h3>Film &amp; edit</h3><p>Capture the story and use pacing, sound, and cuts to keep it moving.</p></article><article><span>03 / SHARE</span><h3>Publish &amp; distribute</h3><p>Post to TikTok and adapt selected content for Instagram Reels.</p></article><article><span>04 / LEARN</span><h3>Analyze &amp; refine</h3><p>Use response and performance data to inform what to create next.</p></article></div></section>
 <section class="cr-section cr-selected" id="cr-videos"><div class="cr-section-heading"><div class="cr-section-label">03 / SELECTED VIDEOS</div><h2>Made to be <em>watched.</em></h2><p>Seven selected clips spanning beauty, events, food, and personality-led stories. Each is a work sample, not a claim of a specific campaign result.</p></div><div class="cr-video-grid">${videoCards}</div></section>
 <section class="cr-section cr-results" id="cr-results"><div class="cr-section-heading"><div class="cr-section-label">04 / PERFORMANCE</div><h2>The results behind<br/><em>the storytelling.</em></h2><p>TikTok account analytics · September 14 – November 12, 2026. Period results below are separate from the lifetime follower and likes milestones above.</p></div>
  <div class="cr-kpi-grid"><article class="cr-featured-kpi"><span>POST VIEWS</span><strong>2.7M</strong><small>Across the reporting period</small></article><article><span>TOTAL VIEWERS</span><strong>481.2K</strong></article><article><span>NEW VIEWERS</span><strong>436.7K</strong></article><article><span>LIKES</span><strong>142.1K</strong></article><article><span>SHARES</span><strong>65.5K</strong></article><article><span>PROFILE VIEWS</span><strong>7.2K</strong></article><article><span>COMMENTS</span><strong>1.2K</strong></article></div>
  <div class="cr-proof-grid"><figure><img src="assets/creator-work/metrics-proof.webp" alt="TikTok analytics evidence showing 2.7 million post views, 7.2 thousand profile views, 142.1 thousand likes and 1.2 thousand comments" loading="lazy"/><figcaption>ACCOUNT PERFORMANCE / SELECTED SCREENSHOT</figcaption></figure><figure><img src="assets/creator-work/reach-proof.webp" alt="TikTok analytics screenshot showing 481.2 thousand total viewers and 436.7 thousand new viewers" loading="lazy"/><figcaption>VIEWER REACH / SELECTED SCREENSHOT</figcaption></figure></div>
 </section>
 <section class="cr-section cr-audience"><div class="cr-section-label">05 / AUDIENCE INSIGHTS</div><div><h2>Knowing <em>who's watching.</em></h2><p>During the same period, 74% of viewers were female and 77.8% were ages 18–34 — useful context for my understanding of young lifestyle and consumer audiences.</p><div class="cr-audience-stats"><div><strong>74%</strong><span>Female viewers</span></div><div><strong>77.8%</strong><span>Ages 18–34</span></div></div><details class="cr-audience-proof"><summary>See original audience screenshots</summary><div><img src="assets/creator-work/gender-proof.webp" alt="TikTok audience gender screenshot: 25 percent male, 74 percent female, 1 percent other" loading="lazy"/><img src="assets/creator-work/age-proof.webp" alt="TikTok audience age breakdown screenshot with 47.1 percent ages 18–24 and 30.7 percent ages 25–34" loading="lazy"/></div></details></div></section>
 <section class="cr-section cr-reflection"><div class="cr-section-label">06 / LESSONS LEARNED</div><div><h2>The strongest videos<br/>felt <em>like me.</em></h2><p>Early on, I chased trends before establishing formats of my own. Looking back, the work that resonated most was the work only I could have made. I'd now focus on two repeatable formats, then let trends support them rather than define them.</p><p>I'd also build an audience relationship outside the platforms earlier instead of relying entirely on the algorithm.</p><blockquote>“Attention is earned through originality, storytelling, and consistency.”</blockquote></div></section>
 <div class="next-project cr-next"><span class="eyebrow">UP NEXT IN THE CABINET</span><button data-route="project/circle-hospitality" type="button">Circle Hospitality ↗</button></div>
 </div></main>`;
}

function genericTemplate(title,description) {
  return `${header()}<main class="page-wrap" id="primary-content"><button class="back-link" data-route="cabinet">← Back to the cabinet</button><div class="eyebrow" style="margin-top:62px">NATALIE LUI · PORTFOLIO</div><h1 class="editorial-heading">${title}</h1><p class="lead">${description}</p><div class="action-row"><button class="link-pill" data-route="cabinet">Explore my work ↗</button></div></main>`;
}
function aboutTemplate() {
  return `${header()}<main class="ab-page" id="primary-content">
  <div class="ab-wrap">
    <button class="back-link ab-back" type="button" data-route="cabinet">← Back to the cabinet</button>
    <section class="ab-hero" aria-labelledby="ab-heading">
      <div class="ab-hero-copy">
        <span class="ab-eyebrow">THE PERSON BEHIND THE WORK</span>
        <h1 id="ab-heading">Hi, I'm <em>Natalie!</em></h1>
        <p class="ab-hero-intro">Marketer. Creator. Community builder. A little bit of everything.</p>
        <p class="ab-hero-sub">I’m based in New York City, and my background sits somewhere between data, creativity, and understanding people.</p>
        <a class="ab-text-link" href="#ab-story">Get to know me <span aria-hidden="true">↓</span></a>
      </div>
      <figure class="ab-hero-figure"><img src="assets/about/about-hero.webp" alt="Natalie smiling in a candid photograph under glowing red neon signage" fetchpriority="high"/><figcaption>NEW YORK, CREATIVE CURIOSITY &amp; EVERYTHING IN BETWEEN</figcaption></figure>
    </section>
    <section class="ab-story" id="ab-story" aria-labelledby="ab-story-heading">
      <div class="ab-section-key">01 / MY STORY</div>
      <div class="ab-story-copy"><h2 id="ab-story-heading">Two sides of the <em>same brain.</em></h2>
        <p>I started my career in business intelligence at Jefferies, where I learned how to turn complex information into clear decisions. Outside of my 9-to-5, I was building a completely different skill set: growing a TikTok audience of more than 200,000 and founding For The Plot NYC, a social club dedicated to making a big city feel a little smaller.</p>
        <p>Being an analyst taught me to question what the numbers are actually saying, look for patterns, and make decisions backed by data. Being a creator and founder taught me the other half.</p>
        <blockquote>“Numbers can tell you what happened, but understanding people tells you <em>why.</em>”</blockquote>
        <p>Today, I'm bringing both sides together through my work at KraveBeauty and Circle Hospitality Group, exploring how content, community, and creative strategy can make brands feel more human.</p>
        <p>I'm especially drawn to beauty, where storytelling, culture, and consumer connection come together. I love figuring out what makes someone stop scrolling, show up to an event, or genuinely connect with a brand.</p>
      </div>
    </section>
    <section class="ab-personal" aria-labelledby="ab-personal-heading">
      <figure class="ab-secondary-figure"><img src="assets/about/about-secondary.webp" alt="Natalie in a candid wide-angle photo sitting near a wall of music and art posters" loading="eager"/><figcaption>OFF THE CLOCK</figcaption></figure>
      <div class="ab-personal-copy"><div class="ab-section-key">02 / OUTSIDE OF WORK</div><h2 id="ab-personal-heading">A little more <em>about me.</em></h2>
        <p>You'll probably find me at a pottery class, doing Pilates, planning my next trip, hiking, or adding another spot to my never-ending list of restaurant recommendations.</p>
        <div class="ab-hobbies" aria-label="Personal interests"><span>Pottery</span><span>Pilates</span><span>Hiking</span><span>Travel</span><span>Food adventures</span></div>
      </div>
    </section>
    <section class="ab-connect" aria-labelledby="ab-connect-title"><span class="ab-eyebrow">SAY HELLO</span><h2 id="ab-connect-title">Have something <em>in mind?</em></h2><p>I'm always happy to connect with creative people, exchange ideas, and explore opportunities.</p><a class="ab-connect-button" href="https://www.linkedin.com/in/luinatalie/" target="_blank" rel="noopener noreferrer" aria-label="Let's connect on LinkedIn (opens in a new tab)">Let's connect <span aria-hidden="true">↗</span></a><span class="ab-cta-note">OPENS LINKEDIN IN A NEW TAB</span></section>
  </div>
  </main>`;
}
function resumeTemplate() {
  const roles = [
    ['Circle Hospitality Group','Marketing Coordinator','November 2026 – Present'],
    ['KraveBeauty','Marketing Intern','October 2026 – Present'],
    ['TikTok','Digital Content Creator · Freelance','November 2020 – Present'],
    ['For The Plot NYC Social Club','Founder, Social Media & Community Marketing Lead','May 2024 – October 2026'],
    ['Jefferies','Business Intelligence Analyst','June 2022 – September 2025']
  ];
  return `${header()}<main class="rs-page" id="primary-content">
  <div class="rs-wrap">
    <button class="back-link rs-back" data-route="cabinet" type="button">← Back to the cabinet</button>
    <div class="rs-page-meta"><span>NATALIE LUI / EXPERIENCE</span><span>RESUME</span></div>
    <section class="rs-intro" aria-labelledby="rs-title">
      <div><span class="rs-eyebrow">BACKGROUND & EXPERIENCE</span><h1 id="rs-title">The <em>résumé.</em></h1>
      <p>From business intelligence to beauty marketing, content, and community — here's the experience behind the work.</p>
      <div class="rs-actions">
        <a class="rs-primary" href="assets/Natalie_Lui_Resume.pdf" target="_blank" rel="noopener noreferrer">View full résumé <span aria-hidden="true">↗</span></a>
        <a class="rs-secondary" href="assets/Natalie_Lui_Resume.pdf" download="Natalie_Lui_Resume.pdf">Download PDF <span aria-hidden="true">↓</span></a>
      </div></div>
      <div class="rs-intro-note"><span>THE SHORT VERSION</span><strong>Data-minded.<br>People-focused.<br>Creatively driven.</strong></div>
    </section>
    <section class="rs-content" aria-label="Resume and career overview">
      <div class="rs-paper-column">
        <div class="rs-section-label">FULL RÉSUMÉ / 01 PAGE</div>
        <a class="rs-paper" href="assets/Natalie_Lui_Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open full résumé PDF in a new tab">
          <img src="assets/Natalie_Lui_Resume_preview.webp" loading="lazy" width="1100" height="1424" alt="Preview of Natalie Lui's one-page professional résumé. Select to read the full PDF." />
          <span>Click to view full size ↗</span>
        </a>
      </div>
      <div class="rs-summary-column">
        <div class="rs-section-label">CAREER AT A GLANCE</div>
        <div class="rs-timeline">${roles.map(([company,title,date])=>`<div class="rs-role"><div class="rs-company">${company}</div><div class="rs-title">${title}</div><div class="rs-date">${date}</div></div>`).join('')}</div>
        <div class="rs-education"><div class="rs-section-label">EDUCATION</div><strong>Rowan University</strong><p>B.S. Finance · Minor in Marketing<br>Cum Laude, Dean's List · May 2022</p></div>
        <div class="rs-education"><div class="rs-section-label">CERTIFICATION</div><strong>DesignLab</strong><p>UX/UI Designer Certification · February 2025</p></div>
        <div class="rs-footnote">For a detailed description of my work, explore the five case studies in the cabinet.</div>
      </div>
    </section>
    <section class="rs-bottom"><h2>Want to know more?</h2><p>Let's connect about creative marketing, community, and opportunities to collaborate.</p><a href="https://www.linkedin.com/in/luinatalie/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a></section>
  </div></main>`;
}
function contactTemplate() {
  return `${header()}<main class="ct-page" id="primary-content">
    <div class="ct-wrap">
      <button class="back-link ct-back" data-route="cabinet" type="button">← Back to the cabinet</button>
      <div class="ct-topline"><span>NATALIE LUI / SAY HELLO</span><span>CONTACT / 04</span></div>
      <div class="ct-layout">
        <section class="ct-intro" aria-labelledby="ct-title">
          <span class="ct-eyebrow">OPEN TO NEW CONVERSATIONS</span>
          <h1 id="ct-title">Good things start <em>with a conversation.</em></h1>
          <p>Have a role, collaboration, or creative idea in mind? I'd love to hear from you — especially if it brings together beauty, content, and community.</p>
          <div class="ct-tags" aria-label="Focus areas"><span>Beauty marketing</span><span>Content &amp; storytelling</span><span>Community</span></div>
        </section>
        <aside class="ct-card" aria-label="Ways to get in touch">
          <div class="ct-card-top"><span>LET'S TALK</span><span aria-hidden="true">✳</span></div>
          <div class="ct-method"><div class="ct-method-label">01 / EMAIL</div><h2>Drop me a line.</h2><a class="ct-email" href="mailto:natalievlui24@gmail.com">natalievlui24@gmail.com <span aria-hidden="true">↗</span></a><p>Best for opportunities, projects, or a proper introduction.</p></div>
          <div class="ct-method ct-method-last"><div class="ct-method-label">02 / LINKEDIN</div><h2>Let's connect.</h2><a class="ct-social" href="https://www.linkedin.com/in/luinatalie/" target="_blank" rel="noopener noreferrer" aria-label="Open Natalie's LinkedIn profile in a new tab">Visit my LinkedIn <span aria-hidden="true">↗</span></a><p>For networking, sharing ideas, and staying in touch.</p></div>
          <div class="ct-card-bottom">BASED IN NEW YORK CITY <span aria-hidden="true">✦</span> ALWAYS CURIOUS</div>
        </aside>
      </div>
      <div class="ct-bottom"><span>THANKS FOR STOPPING BY ♡</span><button type="button" data-route="cabinet">Explore my work <span aria-hidden="true">↗</span></button></div>
    </div>
  </main>`;
}

function render() {
  clearTimeout(openTimer);
  isOpening = false;
  openButton.disabled = false;
  const route = decodeURIComponent(window.location.hash.replace(/^#\/?/,'').trim()) || 'home';
  const isStage = route==='home'||route==='cabinet';
  appStage.hidden = !isStage;
  pageView.hidden = isStage;
  appStage.classList.remove('is-opening');
  if (isStage) {
    pageView.innerHTML='';
    if (route === 'home') {
      appStage.classList.remove('is-open');
      cabinet.classList.remove('is-visible');
      cabinet.setAttribute('aria-hidden','true');
      cabinet.inert = true;
    } else {
      appStage.classList.add('is-open');
      cabinet.classList.add('is-visible');
      cabinet.setAttribute('aria-hidden','false');
      cabinet.inert = false;
    }
  } else {
    appStage.classList.remove('is-open');
    cabinet.classList.remove('is-visible');
    cabinet.setAttribute('aria-hidden','true');
    cabinet.inert = true;
    if(route==='project/kravebeauty') pageView.innerHTML=kraveTemplate();
    else if(route==='project/content-creation') pageView.innerHTML=creatorTemplate();
    else if(route==='project/for-the-plot') pageView.innerHTML=ftpTemplate();
    else if(route==='project/circle-hospitality') pageView.innerHTML=circleTemplate();
    else if(route==='project/jefferies') pageView.innerHTML=jefferiesTemplate();
    else if(route.startsWith('project/')) pageView.innerHTML=caseTemplate(route.slice(8));
    else if(route==='about') pageView.innerHTML=aboutTemplate();
    else if(route==='resume') pageView.innerHTML=resumeTemplate();
    else if(route==='contact') pageView.innerHTML=contactTemplate();
    else pageView.innerHTML=genericTemplate('Not found','That page is not in the cabinet yet.');
    window.scrollTo({top:0,behavior:'instant'});
  }
}
render();
