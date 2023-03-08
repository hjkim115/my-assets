export default function Home({btcPrice}) {
  return (
    <>
      <h1>{btcPrice}</h1>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api")
  const btcPrice = await res.json()

  return {
      props: {
        btcPrice,
      },
  }
}
