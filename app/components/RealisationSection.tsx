import { motion } from "framer-motion";
import DesignCarousel from "./DesignCarousel";
import { type Realisation } from "../../lib/projects-data";

interface RealisationSectionProps {
  project: Realisation;
  index: number;
}

export default function RealisationSection({ project, index }: RealisationSectionProps) {
  const isEven = index % 2 === 0;
  const imageFirst = isEven; // alternating layout

  return (
    <section
      className="relative py-16 md:py-24 px-4 sm:px-6"
      style={{
        backgroundImage: `linear-gradient(${project.gradient})`,
        backgroundColor: "#0a0a0a",
      }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {imageFirst && <StickyPreview project={project} />}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-3">
            {project.category}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {project.name}
          </h2>
          <p className="text-base text-zinc-300 mb-6 leading-relaxed">
            {project.description}
          </p>
          <p className="text-sm text-zinc-400 mb-6 border-l border-white/10 pl-4">
            {project.approach}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {project.features.map((feat: string) => (
              <span
                key={feat}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              >
                {feat}
              </span>
            ))}
          </div>
          <DesignCarousel
            slides={project.slides}
            accentGradient={project.gradient}
            projectKey={project.id}
          />
        </motion.div>
        {!imageFirst && <StickyPreview project={project} />}
      </div>
    </section>
  );
}

function StickyPreview({ project }: { project: Realisation }) {
  return (
    <div className="sticky top-24 flex justify-center items-center">
      <div className="text-9xl md:text-[10rem]" aria-label={project.name}>
        {project.mockup}
      </div>
    </div>
  );
}
