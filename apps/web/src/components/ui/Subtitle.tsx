type Props = {
  children: React.ReactNode
}

const Subtitle = (props: Props) => {
  const { children } = props

  return <p className="text-small text-default-500">{children}</p>
}

export default Subtitle
