import { Link } from "@nextui-org/link"

type Color =
  | "foreground"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"

interface Props {
  color?: Color
  children: React.ReactNode
  href: string
  className?: string
}

const NextLink = (props: Props) => {
  const { color = "foreground", children, ...otherProps } = props

  return (
    <Link color={color} {...otherProps}>
      {children}
    </Link>
  )
}

export default NextLink
