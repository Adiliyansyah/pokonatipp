import Link from "next/link"

type ItemProps = {
  href: string
  label: string
  icon: React.ReactNode
  isOpen: boolean
}

export default function SidebarItem({ href, label, icon, isOpen }: ItemProps) {
  return (
    <li className="hover:bg-teal-700 p-2 rounded">
      <Link href={href} className="flex items-center">
        <div className="mr-2">{icon}</div>
        <span className={`${isOpen ? "block" : "hidden"}`}>
          {label}
        </span>
      </Link>
    </li>
  )
}