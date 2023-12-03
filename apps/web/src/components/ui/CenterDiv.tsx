import clsx from "clsx"

type Props = {
  children: React.ReactNode
  className?: string
}

const CenterDiv = (props: Props) => {
  const { children, className } = props

  return (
    <div
      className={clsx(
        "fixed top-0 flex h-screen w-screen items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default CenterDiv
