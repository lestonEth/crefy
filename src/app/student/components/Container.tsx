
interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="min-h-screen min-w-screen flex ">
            
            {children}
        </div>
    )
}