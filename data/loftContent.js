// Default long-form content for the loft pages. Everything here is copied into
// Sanity by `npm run seed:content` and can then be edited (or replaced) there.
// Image fields are left empty on purpose: those sections stay text-only, or
// hidden for galleries / before-and-after, until photos are added in Studio.
//
// Facts kept general on purpose. Prices and build times differ per job, so
// add your own figures in Studio ("Key facts" sections) rather than here.

let counter = 0;
const key = () => `d${(counter++).toString(36)}`;

// Plain text → Portable Text. Paragraphs are separated by blank lines;
// "### " starts a sub-heading and lines starting "- " become bullet points.
export function pt(text) {
  const blocks = [];
  for (const chunk of text.trim().split(/\n\s*\n/)) {
    const lines = chunk.trim().split("\n").map((l) => l.trim());
    if (lines.every((l) => l.startsWith("- "))) {
      for (const line of lines) {
        blocks.push(block(line.slice(2), "normal", { listItem: "bullet", level: 1 }));
      }
    } else if (lines[0].startsWith("### ")) {
      blocks.push(block(lines[0].slice(4), "h3"));
      if (lines.length > 1) blocks.push(block(lines.slice(1).join(" ")));
    } else {
      blocks.push(block(lines.join(" ")));
    }
  }
  return blocks;
}

function block(text, style = "normal", extra = {}) {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
    ...extra,
  };
}

const s = (type, fields) => ({ _type: type, _key: key(), ...fields });
const items = (list) => list.map((item) => ({ _key: key(), ...item }));
const faqs = (list) => list.map(([question, answer]) => ({ _key: key(), question, answer }));

const emptyGallery = (heading, intro) => s("sectionGallery", { heading, intro, images: [] });
const emptyBeforeAfter = (heading) =>
  s("sectionBeforeAfter", {
    heading,
    intro: "Drag the photos in Studio to show the space before we started and the finished room.",
    pairs: [],
  });
const emptyQuote = (location) => s("sectionQuote", { quote: "", name: "", location });

const commonPlanning = `
Every loft conversion needs building regulations approval, whether or not it needs planning permission. We prepare the drawings and structural calculations and deal with building control for you, so the finished room is signed off and properly recorded against your home.

### Planning permission or permitted development?
Many loft conversions can be built under permitted development, which means no full planning application. There are limits: as a guide, the extra roof space can't exceed 40 cubic metres on a terraced house or 50 cubic metres on a semi-detached or detached house, and the work mustn't extend beyond the front roof slope. Flats, listed buildings and homes in conservation areas usually need full planning permission. We check which route applies to your home before any work is priced.

### Party wall agreements
If your house shares a wall with a neighbour, the Party Wall Act will usually apply, because steel beams often bear into the shared wall. We explain the process early and help you serve the right notices, so there are no surprises once work is due to start.

### Fire safety
Converting a loft adds a storey, so building regulations ask for a protected escape route. In practice that usually means fire doors onto the stairwell, mains-linked smoke alarms and sometimes escape windows. We build this into the design from the start.`;

export const loftHubContent = {
  body: pt(`
A loft conversion is one of the most cost-effective ways to add space to a London or Essex home. You're building into a structure you already own, so there's no garden lost, usually no new foundations, and the finished room feels like it was always part of the house.

Most of our clients are growing families who need another bedroom, people working from home who want a proper office, or homeowners adding a main suite with its own en-suite. Whatever the reason, the aim is the same: a bright, warm, full-height room you'll actually use every day.`),
  sections: [
    s("sectionTextImage", {
      eyebrow: "Why convert your loft",
      heading: "More space without moving house",
      text: pt(`
Moving house means stamp duty, agents' fees, solicitors and the upheaval of starting again somewhere new. A loft conversion gives you the extra room you need in the home and area you already love.

A well-designed conversion can add a bedroom, a bathroom and storage in one project. It's also one of the improvements most valued by buyers, so it adds to your home's appeal when the time does come to sell.`),
      imagePosition: "right",
    }),
    s("sectionFeatures", {
      heading: "Why homeowners choose Loft Maker London",
      intro: "One team handles the whole job: no chasing separate trades, no gaps between them.",
      items: items([
        { title: "In-house team", text: "Design, structural steel, GRP roofing and finishing are all done by our own team, so the job keeps moving." },
        { title: "Planning handled", text: "We prepare the drawings and deal with planning or permitted development and building control for you." },
        { title: "10-year structural warranty", text: "Every project is backed by a 10-year structural warranty. We build things to last and stand behind them." },
        { title: "One point of contact", text: "You deal with one person from the first visit to the final sign-off. No being passed around." },
        { title: "Clear pricing", text: "A clear, itemised quote up front, so you know exactly what's included before we start." },
        { title: "Honest timelines", text: "Realistic schedules and regular updates, so you can plan around the build with confidence." },
      ]),
    }),
    s("sectionTextImage", {
      eyebrow: "Is my loft suitable?",
      heading: "What we look at on your free survey",
      text: pt(`
Most houses with a pitched roof can be converted, but the type of conversion depends on a few things we check on our first visit:

- Head height: as a rough guide, around 2.2m from the top of the floor joists to the underside of the ridge
- Roof shape: hipped, gabled or a London butterfly roof
- Roof structure: traditional rafters or modern trussed rafters
- Where the stairs can go without losing too much space below
- Planning: permitted development, conservation area or full planning

If head height is tight, there are often still options. Lowering the ceilings below or a mansard-style roof can make room. We'll tell you honestly what's possible.`),
      imagePosition: "left",
    }),
    emptyGallery("Loft conversions we've built", "A selection of recent loft conversions across London and Essex."),
    emptyBeforeAfter("Before and after"),
    s("sectionTextImage", {
      eyebrow: "Planning & regulations",
      heading: "We handle the paperwork",
      text: pt(commonPlanning),
      imagePosition: "right",
    }),
    emptyQuote("Loft conversion"),
    s("sectionCtaBanner", {
      heading: "Not sure which loft conversion is right for you?",
      text: "Book a free survey and we'll talk you through the options for your home, with honest advice and a clear quote.",
      buttonLabel: "Book a free survey",
    }),
  ],
  faqs: faqs([
    ["Do you handle planning permission?", "Yes. We take care of the drawings, planning or permitted development and building regulations approval as part of the job."],
    ["Is the work guaranteed?", "Every project we deliver is backed by a 10-year structural warranty."],
    ["Which areas do you cover?", "We work across London and Essex, including Chingford, South Woodford and Rayleigh."],
    ["How do I find out if my loft is suitable?", "Book a free, no-obligation survey. We'll look at your head height, roof structure and where the stairs could go, then explain the options that suit your home."],
    ["Can we stay at home during the build?", "In most cases, yes. Most of the work happens from the outside and inside the roof space, and we only open up into the house below near the end, when the staircase goes in."],
    ["Will I need a party wall agreement?", "If you share a wall with a neighbour, usually yes. We explain the process and help you serve the right notices in good time."],
    ["What's included in the price?", "Your quote is itemised, so you can see exactly what's included, from design and structural work to roofing, insulation, stairs and finishing."],
  ]),
};

export const loftPageContent = {
  dormer: {
    body: pt(`
A dormer is the most popular type of loft conversion in London and Essex, and for good reason. A box-shaped structure is built out from the slope of your roof, usually at the back, turning a cramped, sloping loft into a room with full head height, straight walls and a proper window.

Because a dormer adds so much usable floor space for its cost, it's often the best-value way to add a double bedroom with an en-suite, a home office or a playroom.`),
    sections: [
      s("sectionKeyFacts", {
        heading: "At a glance",
        facts: items([
          { label: "Best for", value: "Terraced, semi-detached and detached homes" },
          { label: "Planning", value: "Rear dormers are often permitted development" },
          { label: "Adds", value: "Full-height space for a bedroom, en-suite or office" },
          { label: "Warranty", value: "10-year structural warranty" },
        ]),
      }),
      s("sectionTextImage", {
        eyebrow: "What is a dormer?",
        heading: "Full head height where you need it",
        text: pt(`
In a standard loft, the sloping roof limits where you can stand. A dormer extends the roof outwards with vertical walls and a flat or pitched top, so most of the floor becomes usable.

Most of the work is done from outside on a scaffold, through the roof, so disruption to the rest of the house is kept to a minimum. We only open up into your home near the end, when the new staircase goes in.`),
        imagePosition: "right",
      }),
      s("sectionFeatures", {
        heading: "Types of dormer",
        intro: "The right style depends on your roof, your house and what you want the room for.",
        items: items([
          { title: "Rear flat-roof dormer", text: "The most common choice. Spans the back of the roof for the most floor space and is often permitted development." },
          { title: "L-shaped dormer", text: "Wraps over the back addition of a period terrace to create two connected spaces, ideal for a bedroom plus en-suite." },
          { title: "Pitched-roof dormer", text: "A smaller dormer with its own pitched roof. Often used at the front, where it suits the look of the street." },
          { title: "Dormer with Juliet balcony", text: "Full-height glazed doors with a balcony rail bring in extra light and views without a full balcony." },
        ]),
      }),
      s("sectionTextImage", {
        eyebrow: "Why choose a dormer",
        heading: "The best-value way to add a room",
        text: pt(`
- Adds the most usable floor space for the cost
- Room for a double bedroom with an en-suite
- Suits most house types, including period terraces
- Often built under permitted development, with no full planning application
- Most work happens from outside, so you can usually stay at home`),
        imagePosition: "left",
      }),
      emptyGallery("Dormer conversions we've built", "Photos of recent dormer loft conversions."),
      emptyBeforeAfter("Before and after"),
      s("sectionTextImage", {
        eyebrow: "Planning & regulations",
        heading: "Planning, building regs and party walls",
        text: pt(commonPlanning),
        imagePosition: "right",
      }),
      emptyQuote("Dormer loft conversion"),
      s("sectionCtaBanner", {
        heading: "Could your loft take a dormer?",
        text: "Book a free survey and we'll check your head height, roof structure and planning route.",
        buttonLabel: "Book a free survey",
      }),
    ],
    faqs: faqs([
      ["Do I need planning permission for a dormer?", "Rear dormers are often permitted development, as long as they stay within the volume limits and don't face the road. Front dormers, flats and homes in conservation areas usually need planning permission. We'll confirm the route for your home."],
      ["Can I add an en-suite in a dormer conversion?", "Yes. Dormers give enough head height for a shower room or bathroom, and we plan the layout around where pipes and drainage can run."],
      ["Will a dormer match my house?", "We choose materials, such as tiles, cladding and window styles, to suit your property, and can use a pitched-roof dormer where it fits the street better."],
      ["Can we live at home during the build?", "Usually, yes. Most of the work is done from a scaffold outside, and the house is only opened up near the end when the stairs go in."],
    ]),
  },
  "hip-to-gable": {
    body: pt(`
Many semi-detached and end-of-terrace homes have a hipped roof, which slopes down on the side as well as the front and back. That sloping side eats into the loft and leaves very little usable space.

A hip-to-gable conversion straightens the side slope into a vertical gable wall, extending the ridge out to the edge of the house. The result is a much larger loft with room for a proper staircase, and it's usually combined with a rear dormer for the most space.`),
    sections: [
      s("sectionKeyFacts", {
        heading: "At a glance",
        facts: items([
          { label: "Best for", value: "Semi-detached, end-of-terrace and detached homes" },
          { label: "Planning", value: "Often permitted development" },
          { label: "Often paired with", value: "A rear dormer for maximum space" },
          { label: "Warranty", value: "10-year structural warranty" },
        ]),
      }),
      s("sectionTextImage", {
        eyebrow: "What is a hip-to-gable?",
        heading: "Turning a sloping side into usable space",
        text: pt(`
We remove the hipped end of the roof, build the side wall up to the new ridge line and extend the roof across. The new gable wall is finished to match your house, in brick or render.

Because the ridge now runs the full width of the house, the staircase can rise up into the middle of the loft beneath the highest point of the roof. That's often what makes the conversion work.`),
        imagePosition: "right",
      }),
      s("sectionFeatures", {
        heading: "Popular layouts",
        items: items([
          { title: "Hip-to-gable with rear dormer", text: "The most popular combination: the gable adds width and the dormer adds height across the back." },
          { title: "Double hip-to-gable", text: "For detached homes with hips on both sides, converting both creates a very large loft space." },
          { title: "Bedroom and en-suite", text: "Plenty of room for a double bedroom, en-suite shower room and built-in storage in the eaves." },
          { title: "Main bedroom suite", text: "A main bedroom with dressing area and en-suite, freeing up the floor below." },
        ]),
      }),
      s("sectionTextImage", {
        eyebrow: "Why choose a hip-to-gable",
        heading: "The answer for semi-detached homes",
        text: pt(`
- Unlocks space a dormer alone can't reach on a hipped roof
- Room for a full staircase above the existing stairs
- Combines well with a rear dormer
- Often permitted development
- Finished to match your existing brickwork or render`),
        imagePosition: "left",
      }),
      emptyGallery("Hip-to-gable conversions we've built", "Photos of recent hip-to-gable loft conversions."),
      emptyBeforeAfter("Before and after"),
      s("sectionTextImage", {
        eyebrow: "Planning & regulations",
        heading: "Planning, building regs and party walls",
        text: pt(commonPlanning),
        imagePosition: "right",
      }),
      emptyQuote("Hip-to-gable loft conversion"),
      s("sectionCtaBanner", {
        heading: "Got a hipped roof?",
        text: "Book a free survey and we'll show you how much space a hip-to-gable could add.",
        buttonLabel: "Book a free survey",
      }),
    ],
    faqs: faqs([
      ["Do I need planning permission for a hip-to-gable?", "Hip-to-gable conversions are often permitted development, as long as they stay within the volume limits. Homes in conservation areas usually need planning permission. We'll confirm for your home."],
      ["Will the new gable wall match my house?", "Yes. We finish the gable to match your existing walls, whether that's brick or render."],
      ["Why combine it with a dormer?", "The gable adds width, and a rear dormer adds full head height across the back. Together they create the most usable space."],
      ["Does it affect my neighbour?", "If you share a wall, the Party Wall Act will usually apply. We explain the process and help you serve notices early."],
    ]),
  },
  mansard: {
    body: pt(`
A mansard conversion replaces your roof slope with an almost vertical wall, set at around 72 degrees, with a flat roof on top. Windows sit in small dormers within the slope.

It creates more internal space than any other type of loft conversion, close to a full extra storey, and is a familiar sight on London terraces, where it often suits the character of the street.`),
    sections: [
      s("sectionKeyFacts", {
        heading: "At a glance",
        facts: items([
          { label: "Best for", value: "Terraced and period homes, especially in London" },
          { label: "Planning", value: "Usually needs full planning permission" },
          { label: "Adds", value: "The most space of any loft conversion" },
          { label: "Warranty", value: "10-year structural warranty" },
        ]),
      }),
      s("sectionTextImage", {
        eyebrow: "What is a mansard?",
        heading: "Almost a whole new floor",
        text: pt(`
Instead of building out from the existing slope, a mansard rebuilds the roof itself. The steep, near-vertical sides and flat top give full head height across almost the whole footprint of the house.

Mansards can be built at the back of the house, or across both front and back where the street already has them. Because the look of the roof changes, the design needs care. We work with you on materials and window styles that suit your house and your local planning policies.`),
        imagePosition: "right",
      }),
      s("sectionFeatures", {
        heading: "Types of mansard",
        items: items([
          { title: "Rear mansard", text: "Built across the back roof slope, keeping the front of the house unchanged from the street." },
          { title: "Double mansard", text: "Front and back slopes both rebuilt, creating the largest possible space where planning allows." },
          { title: "L-shaped mansard", text: "Extends over the back addition of a terrace for an extra room or bathroom." },
          { title: "Mansard with roof terrace", text: "Where planning allows, a small terrace can be set into the roof for outdoor space with a view." },
        ]),
      }),
      s("sectionTextImage", {
        eyebrow: "Why choose a mansard",
        heading: "The most space, built to suit the street",
        text: pt(`
- The most internal space of any loft conversion
- Full head height across almost the whole floor
- Room for two bedrooms or a large suite
- Often accepted in conservation areas where a box dormer isn't
- A classic look that suits period London terraces`),
        imagePosition: "left",
      }),
      emptyGallery("Mansard conversions we've built", "Photos of recent mansard loft conversions."),
      emptyBeforeAfter("Before and after"),
      s("sectionTextImage", {
        eyebrow: "Planning & regulations",
        heading: "Planning, building regs and party walls",
        text: pt(`
Because a mansard changes the shape of the roof, it usually needs full planning permission rather than permitted development. We prepare the drawings, submit the application and deal with the council for you. Where your street already has mansards, that's a good sign.

Every loft conversion also needs building regulations approval. We prepare the drawings and structural calculations and deal with building control, so the finished room is signed off and properly recorded against your home.

### Party wall agreements
Most mansards are on terraced houses, so the Party Wall Act will almost always apply. We explain the process and help you serve the right notices in good time.

### Fire safety
A mansard adds a storey, so building regulations ask for a protected escape route. That usually means fire doors onto the stairwell and mains-linked smoke alarms, which we design in from the start.`),
        imagePosition: "right",
      }),
      emptyQuote("Mansard loft conversion"),
      s("sectionCtaBanner", {
        heading: "Thinking about a mansard?",
        text: "Book a free survey and we'll talk through the design, the planning route and what it could add to your home.",
        buttonLabel: "Book a free survey",
      }),
    ],
    faqs: faqs([
      ["Does a mansard need planning permission?", "Usually, yes, because it changes the shape of the roof. We prepare and submit the application and handle the process with the council."],
      ["Can I build a mansard in a conservation area?", "Often, yes. A well-designed mansard is frequently more acceptable than a box dormer in a conservation area, especially where neighbours already have one."],
      ["How is a mansard different from a dormer?", "A dormer extends out from the existing roof slope, while a mansard rebuilds the roof with near-vertical sides. That gives more space and a more traditional look."],
      ["Do mansards suit terraced houses?", "Yes, they're very common on London terraces and make the most of a narrow footprint."],
    ]),
  },
};
