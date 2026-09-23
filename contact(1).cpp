#include <iostream>
#include <string>
using namespace std;

const int MAX = 10;

class Contact
{
public:
    string name;
    string phone;
};

Contact contacts[MAX];
int count = 0;

// Add Contact
void addContact()
{
    if (count == MAX)
    {
        cout << "\nContact List is Full!\n";
        return;
    }

    cout << "Enter Name: ";
    cin.ignore();
    getline(cin, contacts[count].name);

    cout << "Enter Phone Number: ";
    getline(cin, contacts[count].phone);

    count++;
    cout << "\nContact Added Successfully!\n";
}

// Display Contacts
void displayContacts()
{
    if (count == 0)
    {
        cout << "\nNo Contacts Available!\n";
        return;
    }

    cout << "\n----- Contact List -----\n";
    for (int i = 0; i < count; i++)
    {
        cout << "\nName : " << contacts[i].name;
        cout << "\nPhone: " << contacts[i].phone << endl;
    }
}

// Search Contact
void searchContact()
{
    string name;
    cout << "\nEnter Name to Search: ";
    cin.ignore();
    getline(cin, name);

    for (int i = 0; i < count; i++)
    {
        if (contacts[i].name == name)
        {
            cout << "\nContact Found!\n";
            cout << "Name : " << contacts[i].name << endl;
            cout << "Phone: " << contacts[i].phone << endl;
            return;
        }
    }

    cout << "\nContact Not Found!\n";
}

int main()
{
    int choice;

    do
    {
        cout << "\n====== CONTACT MANAGEMENT SYSTEM ======\n";
        cout << "1. Add Contact\n";
        cout << "2. Display Contacts\n";
        cout << "3. Search Contact\n";
        cout << "4. Exit\n";
        cout << "Enter Choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            addContact();
            break;

        case 2:
            displayContacts();
            break;

        case 3:
            searchContact();
            break;

        case 4:
            cout << "\nThank You!\n";
            break;

        default:
            cout << "\nInvalid Choice!\n";
        }

    } while (choice != 4);

    return 0;
}