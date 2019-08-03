from tkinter import *
from tkinter import ttk
from tkinter import filedialog

import utils

root = Tk()
root.title("Plecotus")

folder_path = StringVar()


def browse_button():
    filename = filedialog.askdirectory()
    folder_path.set(filename)
    print(filename)


def scan():
    utils.scan(folder_path.get())


mainframe = ttk.Frame(root, padding="3 3 12 12")
mainframe.grid(column=0, row=0, sticky=(N, W, E, S))
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)

ttk.Label(mainframe, text="Selectionner le dossier").grid(
    column=0, row=0, sticky=W)
ttk.Button(mainframe, text="Ouvrir", command=browse_button).grid(
    column=1, row=0, sticky=E)

ttk.Label(mainframe, textvariable=folder_path).grid(column=0, row=1, sticky=W)
ttk.Button(mainframe, text="Importer", command=scan).grid(
    column=1, row=1, sticky=E)

root.mainloop()
