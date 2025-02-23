import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const skills = {
    languages: ["Java", "JavaScript", "MySQL", "MongoDB", "Apex"],
    webTech: ["HTML", "CSS", "Bootstrap", "Node.js", "React", "Redux", "Express", "LWC"],
    tools: ["Git", "Eclipse", "VSCode", "Postman", "Salesforce Org"]
  };

  const experience = [
    {
      title: "Systems Engineer",
      company: "Infosys LTD.",
      period: "Aug 2022 - Present",
      location: "Chandigarh, India",
      points: [
        "Trained on Salesforce, Apex, LWC, Salesforce Admin, Platform Development",
        "Working as a salesforce developer handling LWC components, admin role and platform development"
      ]
    },
    {
      title: "Salesforce Trainee Developer",
      company: "Dohrinni Technologies",
      period: "Apr 2022 - Aug 2022",
      location: "Gujarat, India",
      points: [
        "VS code as IDE and Development in Apex and LWC",
        "Implemented functional requirements and built optimized logic"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      school: "Allenhouse Institute of Technology, Kanpur",
      period: "2018-2022",
      score: "CGPA – 7.78/10"
    },
    {
      degree: "12th Board (ISC)",
      school: "Mother Teresa Mission Higher Secondary School, Kanpur",
      period: "2017-2018",
      score: "Percentage - 80%"
    }
  ];

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-muted-foreground">{job.company}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {job.period} | {job.location}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {job.points.map((point, i) => (
                    <li key={i} className="text-sm">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Languages and Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Web Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.webTech.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-muted-foreground">{edu.school}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.period} | {edu.score}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
