import { ArrowRight, Calculator, DollarSign, PieChart, TrendingUp } from "lucide-react"
import Link from "next/link"
import styles from "@/styles/Tools.module.css"

const analysisTools = [
    {
        title: "Calculadora del valor intrínseco",
        description: "Calcular el valor razonable de una acción utilizando el método del flujo de caja descontado",
        icon: DollarSign,
        href: "/tools/intrinsic-value",
    },
    {
        title: "Valoración PER",
        description: "Determinar el valor de las acciones mediante el método de la relación precio/beneficios",
        icon: Calculator,
        href: "/tools/per-value",
    }
]

export default function Tools() {
    return (
        <div className={styles.toolsGrid}>
            {analysisTools.map((tool, index) => (
                <Link key={index} href={tool.href} className={styles.toolCard}>
                    <div className={styles.toolCardContent}>
                        <div className={styles.toolIconContainer}>
                            <tool.icon className={styles.toolIcon} />
                        </div>
                        <h3 className={styles.toolTitle}>{tool.title}</h3>
                        <p className={styles.toolDescription}>{tool.description}</p>
                        <div className={styles.toolAction}>
                            Pruébelo ahora
                            <ArrowRight className={styles.smallIcon} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}