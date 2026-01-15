import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/src/components/ui/menubar"
import clsx from "clsx"

type NavbarProps = React.ComponentPropsWithoutRef<typeof Menubar>

export function Navbar({ className, ...props }: NavbarProps) {
    return (
        <Menubar className={clsx(
            "w-fit gap-10 px-10",
            className
        )}
            {...props}>
            <MenubarMenu>
                <MenubarTrigger className="focus:bg-amber-400 rounded-2xl">Home</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        New Window <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Email link</MenubarItem>
                            <MenubarItem>Messages</MenubarItem>
                            <MenubarItem>Notes</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Dashboard</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Find</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Search the web</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Find...</MenubarItem>
                            <MenubarItem>Find Next</MenubarItem>
                            <MenubarItem>Find Previous</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Profile</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        Always Show Full URLs
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem inset>
                        Reload <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled inset>
                        Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Hide Sidebar</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Settings</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                    <MenubarItem inset>Edit...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Add Profile...</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
