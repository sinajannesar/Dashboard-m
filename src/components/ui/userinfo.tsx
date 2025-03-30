import { UserInfoProps } from "@/types/next-auth";

export function UserInfo({ name, email, phone, website, company, onClose }: UserInfoProps) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
            <div className="bg-white  p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-blue-500">User Information</h2>
                <p className="text-blue-500/40"><strong className="text-blue-400">Name:</strong> {name}</p>
                <p className="text-blue-500/40"><strong className="text-blue-400">Email:</strong> {email}</p>
                <p className="text-blue-500/40"><strong className="text-blue-400">Phone:</strong> {phone}</p>
                <p className="text-blue-500/40"><strong className="text-blue-400">Website:</strong> {website}</p>
                <p className="text-blue-500/40"><strong className="text-blue-400">Company:</strong> {company}</p>

                <button className="mt-4 px-4 py-2 hover:bg-red-500 bg-blue-500 text-white rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
