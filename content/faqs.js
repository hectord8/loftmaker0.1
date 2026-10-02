/**
 * FAQ content.
 *
 * Single source of truth: the answers are rendered as visible text and marked
 * up as FAQPage from the same objects, so the structured data can never claim
 * something the page does not show.
 *
 * Answers stick to what is known about the business. Nothing is invented -
 * where a fact depends on the property (planning, structural steel, build-up
 * fees, Party Wall notices) the answer says so rather than guessing.
 */
export const generalFaqs = [
  {
    question: "What does Loft Maker London do?",
    answer:
      "We are a London and Essex construction company specialising in loft conversions, dormer and mansard roof construction, side extensions, GRP flat roofing and structural steelwork. We handle design, planning, structural engineering, groundworks, roofing and finishing in-house, so you deal with one team from first drawings to handover.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "We work across London and Essex, including Chingford and South Woodford. We are a mobile, service-area business, so we come to you rather than asking you to visit an office.",
  },
  {
    question: "How much does a loft conversion cost?",
    answer:
      "It depends on the property, the specification and how much of the work is structural. A straightforward conversion in an existing roof space costs less than one that needs a new structural opening, steelwork or extensive roof construction. We price every project individually and give you a clear written quote before work starts, so there is no ambiguity about what you are paying for.",
  },
  {
    question: "Do I need planning permission for a loft conversion?",
    answer:
      "Not always, but it depends on the property and the work. Many loft conversions fall within permitted development, while mansard roofs, dormer windows in conservation areas, and work that changes the volume of a dwelling often need planning permission. Building Regulations approval is a separate requirement and applies to most structural work. We assess your specific property, tell you exactly which permissions are needed, and handle the applications.",
  },
  {
    question: "How long does a loft conversion take?",
    answer:
      "A conversion that does not require planning permission is often built in two to three weeks on site, but the full project - surveys, designs, approvals, build and finishing - takes considerably longer. Projects involving a mansard roof, an extension or steelwork take longer again. We give you a realistic programme with the quote, and we keep you informed if anything changes.",
  },
  {
    question: "Is my project covered by a warranty?",
    answer:
      "Every project we complete is backed by a 10-year structural warranty. The full policy wording and schedule of cover are issued to you at handover, so you know exactly what is covered and what to do if you need to make a claim.",
  },
  {
    question: "Do you handle Party Wall notices?",
    answer:
      "Yes. Where your project affects a neighbouring property, Party Wall notices or an award may be required before work starts. We prepare the necessary paperwork, serve the notices and coordinate with the adjoining owner's surveyor where one is appointed.",
  },
  {
    question: "Can you work from drawings we already have?",
    answer:
      "Yes. If you have planning approval, architectural drawings or structural calculations, we can price and build from them. If you would rather we took the design and planning on as well, we can do that instead - just tell us which stage you have reached.",
  },
  {
    question: "Can you match an existing roof or extension?",
    answer:
      "Yes. We work with a range of roof tiles and finishes, and we match existing materials where we are extending or building alongside original fabric, so the finished work reads as part of the house rather than an addition to it.",
  },
  {
    question: "What happens after I get in touch?",
    answer:
      "We arrange a free, no-obligation consultation at your property. We look at the space, discuss what you want to achieve and any constraints, and then come back to you with options and a clear written quote. There is no obligation to proceed.",
  },
];

/** Questions specific to one service, merged with the general set on its page. */
export const serviceFaqs = {
  "loft-conversions": [
    {
      question: "Is my loft suitable for a conversion?",
      answer:
        "Most loft spaces are, but it depends on the roof span, the headroom under the ridge and how the space is currently used. We assess the structure and the available height before recommending a design, and we will tell you if the space will not work without major alteration.",
    },
    {
      question: "Will a conversion add value to my home?",
      answer:
        "Well-executed additional living space generally increases a home's value and its usable floor area. The extent depends on the quality of the finish and how well the new space works with the existing layout, which is why we focus on usable height, natural light and a proper finish rather than simply adding floor area.",
    },
  ],
  dormer: [
    {
      question: "Do dormers need planning permission?",
      answer:
        "Often not, because dormer windows are commonly permitted development. Restrictions apply in conservation areas and listed buildings, and the window position and overall height matter. We check your specific property and apply on your behalf if permission is required.",
    },
    {
      question: "Are dormers structurally complicated?",
      answer:
        "A dormer cuts into the roof structure, so it is not a purely cosmetic addition. The existing rafters are usually cut or doubled and the opening is framed, with flashings and a new roof section built around it. We handle the structural design and the sequencing so the weather is never left open.",
    },
  ],
  "hip-to-gable": [
    {
      question: "Does converting a hip roof to a gable need planning permission?",
      answer:
        "Not usually, as long as the resulting roof stays within the height limits for permitted development. In conservation areas and on listed buildings the position can be different. We check the specific property before you commit to the design.",
    },
    {
      question: "Is a hip-to-gable conversion worth it?",
      answer:
      "It is often the cheapest way to add meaningful headroom and floor area, because it works with the existing roof rather than adding a new structure. It also usually brings more usable space to the room than building into the eaves, which is where low headroom limits what you can actually use.",
    },
  ],
  mansard: [
    {
      question: "Does a mansard roof need planning permission?",
      answer:
        "Usually yes. A mansard roof changes the overall shape and volume of the dwelling, which generally requires planning permission, and it may also be restricted in conservation areas. We prepare and submit the application as part of the project.",
    },
    {
      question: "How much space does a mansard roof add?",
      answer:
      "A full mansard roof can add a substantial floor, often comparable to a rear extension, because the space sits within the existing footprint. The trade-off is that it is more involved than a simple loft conversion and takes longer, so it suits projects where the extra volume is the priority.",
    },
  ],
  "side-extensions": [
    {
      question: "Do I need planning permission for a side extension?",
      answer:
        "Usually yes. Most side and rear extensions require planning permission because they alter the footprint and massing of the dwelling, and permitted development rights are limited by boundary distances, height and the size of the addition. We handle the application.",
    },
    {
      question: "What about building regulations?",
      answer:
      "Building Regulations approval is separate from planning permission and applies to the structure, insulation, ventilation, fire safety and means of escape. It can run alongside the planning application, and we build to the approved drawings and inspections are arranged as part of the contract.",
    },
  ],
  "grp-flat-roofing": [
    {
      question: "How long does GRP flat roofing last?",
      answer:
      "A properly installed GRP system is expected to last for decades with relatively little maintenance. The lifespan depends far more on the preparation of the deck, the detailing at edges and penetrations, and the quality of the installation than on the material itself.",
    },
    {
      question: "Can you replace an existing flat roof while I stay in the house?",
      answer:
      "In most cases yes. We can work in phases and use temporary weather protection, so the area is covered as the old roof is stripped. If the structure beneath needs work, we will tell you before we start.",
    },
  ],
  "structural-steel": [
    {
      question: "Do I need a structural engineer for my project?",
      answer:
      "Almost always. Openings in floors and roofs, new staircases, and the loads imposed by an extension all need to be checked by a structural engineer, and the calculations are required for Building Regulations approval. We design and fabricate the steel and work to the engineer's calculations.",
    },
    {
      question: "Can you fabricate steel to our drawings?",
      answer:
      "Yes. We can work from your engineer's calculations or produce the design ourselves, then fabricate, deliver and erect the steel to suit the site. Tell us what you have when you get in touch.",
    },
  ],
};

export const faqsForService = (slug) => [...(serviceFaqs[slug] || []), ...generalFaqs];