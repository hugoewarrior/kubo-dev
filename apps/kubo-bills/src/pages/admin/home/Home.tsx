import { signOut } from "@kubo-dev/kubo-auth"

const Home = () => {
    return (
        <button onClick={async () => {
            await signOut()
            window.location.reload();
        }}
        >
            Logout: Home</button>
    )
}

export default Home