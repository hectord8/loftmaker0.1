import { site } from "@/data/site";
import styles from "./trust.module.css";

/**
 * About us / meet the team.
 *
 * Craig Darrach is rendered because the business already names him as the
 * contact. Any biography, team members or photographs come from Sanity and are
 * omitted until the owner supplies them.
 */
export default function Team({ company = null, heading = "Meet the team", id = "team" }) {
  const members = company?.team?.length
    ? company.team
    : [
        {
          name: site.contactName,
          role: site.contactRole,
          bio: null,
        },
      ];

  return (
    <section className={styles.section} id={id} aria-labelledby={`${id}-heading`}>
      <h2 className={styles.heading} id={`${id}-heading`}>
        {heading}
      </h2>
      {members.map((member) => (
        <div className={styles.person} key={member.name}>
          <p className={styles.personName}>{member.name}</p>
          {member.role ? <p className={styles.personRole}>{member.role}</p> : null}
          {member.bio ? <p className={styles.personBio}>{member.bio}</p> : null}
        </div>
      ))}
    </section>
  );
}
