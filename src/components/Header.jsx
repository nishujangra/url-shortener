import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from "lucide-react"
import { UrlState } from "@/context"
import useFetch from "@/hooks/useFetch"
import { logout } from "@/db/apiAuth"
import { BarLoader } from "react-spinners"



const Header = () => {
    const navigate = useNavigate();

    const { user, fetchUser } = UrlState();

    const { loading, fn: fnLogout } = useFetch(logout);

    return (
        <>
            <nav className="p-4 border-b">
                <div className='container mx-auto flex justify-between items-center'>
                    <Link to="/">
                        <div className="text-lg font-bold">
                            Link Shrink
                        </div>
                    </Link>
                    <div className="flex space-x-4 items-center justify-center">
                        <div>
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                        <Avatar>
                                            <AvatarImage src={user?.user_metadata?.profilePic} className='object-contain' />
                                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                            <AvatarFallback>N27</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link to='/dashboard' className="flex">
                                                <LinkIcon size={16} className='mr-2' />
                                                <span>My Links</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className='text-red-400'>
                                            <LogOut size={16} className='mr-2' />
                                            <span onClick={() => {
                                                fnLogout().then(() => {
                                                    fetchUser();
                                                    navigate('/');
                                                });
                                            }}>LogOut</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            ) :
                                <Button onClick={() => navigate('/auth')} className='mx-1' variant="outline">Login</Button>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
        </>
    )
}

export default Header
