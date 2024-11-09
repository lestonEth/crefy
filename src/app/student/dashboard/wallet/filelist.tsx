import { FC } from 'react';
import { Folder, InsertDriveFile, ContentCopy, MoreVert } from '@mui/icons-material';
import Image from 'next/image';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { MouseEvent, useState } from 'react';


type File = {
    name: string;
    cid: string;
    date: string;
    size: string;
    type: 'file' | 'folder';
};

const files: File[] = [
    { name: 'High_School_Diploma.json', cid: 'Qmc3S...6vGQy', date: '11/8/2024', size: '1.16 MB', type: 'file' },
    { name: 'Campus_Degree.json', cid: 'QmTAw...F4VR7', date: '11/7/2024', size: '519 B', type: 'file' },
    { name: 'Encode_Club_Bootcamp.json', cid: 'Qmdu4...xcg4J', date: '10/17/2024', size: '99.41 KB', type: 'folder' },
];

const FileList: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, file: File) => {
        setAnchorEl(event.currentTarget);
        setSelectedFile(file);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedFile(null);
    };

    const handleAction = (action: string) => {
        if (selectedFile) {
            console.log(`${action} action on file: ${selectedFile.name}`);
        }
        handleMenuClose();
    };

    return (
        <div className="text-gray-900 rounded-lg p-4">
            <div className="flex justify-between px-6 pb-4 border-b border-gray-300 text-gray-800">
                <span className="w-1/4">Name</span>
                <span className="w-1/4">CID</span>
                <span className="w-1/4">Creation Date</span>
                <span className="w-1/4"></span>
            </div>
            <div className="">
                {files.map((file, index) => (
                    <div key={index} className="flex items-center p-5 py-7 bg-white my-2 hover:bg-gray-250 rounded-xl">
                        <div className="flex items-center w-1/4 gap-2">
                            {file.type === 'file' ? <InsertDriveFile fontSize="large" /> : <Folder fontSize="large" />}
                            <div>
                                <p className="font-semibold">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                        </div>
                        <div className="flex items-center w-1/4 text-gray-700 font-bold">
                            <span>{file.cid}</span>
                            <ContentCopy fontSize="small" className="ml-2 cursor-pointer" />
                        </div>
                        <div className="w-1/4 text-right text-gray-400">
                            {file.date}
                        </div>

                        <div className="w-1/4 flex justify-end items-center">
                            <IconButton onClick={(e) => handleMenuOpen(e, file)} className="text-gray-400">
                                <MoreVert />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dropdown Menu for each file */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#2d2d2d',
                        color: '#ffffff',
                        minWidth: '150px'
                    }
                }}
            >
                <MenuItem style={{color: 'green', fontWeight: 600}} onClick={() => handleAction('View')}>View</MenuItem>
                <MenuItem style={{color: 'red', fontWeight: 600}} onClick={() => handleAction('Transfer')}>Transfer</MenuItem>
                <MenuItem style={{color: 'red', fontWeight: 600}} onClick={() => handleAction('Hide')}>Hide</MenuItem>
            </Menu>

            <div className="flex justify-end items-center pt-4 text-gray-700 gap-[20%]">
                <div className="flex items-center space-x-2">
                    <span>Rows per page:</span>
                    <select className="bg-gray-400 border-none rounded text-gray-800 py-2 px-5 focus:outline-none">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                    </select>
                </div>
                <div className="flex items-center space-x-4 px-4 font-bold text-xl">
                    <button>{'<'}</button>
                    <button>{'>'}</button>
                </div>
            </div>
        </div>
    );
};

export default FileList;
