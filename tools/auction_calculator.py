#!/usr/bin/env python3
"""
HackGrid Live Auction Bidding Advisor & Budget Tracker
Run this script in your terminal during the live auction:
    python tools/auction_calculator.py
"""

import sys

RESERVE_SCHEDULE = {
    1: {"name": "Track Auction", "reserve": 3000, "items": {
        "Developer Tools": (1000, 150, 1300, "AVOID / High War Risk"),
        "Finance": (800, 125, 1425, "Secondary / High Value"),
        "Healthcare": (600, 100, 1200, "TOP PRIORITY #1"),
        "Education": (400, 75, 850, "Defensive Floor"),
        "Agriculture": (250, 0, 650, "BUDGET ARBITRAGE #2")
    }},
    2: {"name": "AI Rights", "reserve": 2000, "items": {
        "Generative AI": (1000, 150, 3000, "Top Priority"),
        "Predictive & Analytical AI": (800, 125, 2200, "Strong Contender"),
        "Computer Vision": (600, 100, 1600, "Visual Triage"),
        "Speech & Audio AI": (400, 0, 1000, "Ambient Audio Scribe")
    }},
    3: {"name": "AI Capability", "reserve": 1000, "items": {
        "Autonomous Workflow": (1000, 150, 3200, "Tier 1 - Full Loop"),
        "Multi-Agent (LangGraph)": (800, 125, 2600, "Tier 2 - Swarm/Panel"),
        "Single Agent": (600, 100, 1800, "Tier 3 - ReAct Tooling"),
        "Single Prompt": (400, 0, 900, "Tier 4 - Deterministic")
    }},
    4: {"name": "Customer Segment", "reserve": 0, "items": {
        "Organizations": (1000, 150, 3000, "Enterprise Hospital ACV"),
        "Small Businesses": (800, 125, 2500, "Private Clinics"),
        "Professionals": (600, 100, 1800, "Individual Doctors"),
        "Individuals": (400, 0, 1000, "Patients/Consumers")
    }}
}

def print_header(title):
    print("\n" + "=" * 65)
    print(f"  {title}")
    print("=" * 65)

def main():
    total_balance = 10000
    won_inventory = {}

    print_header("HACKGRID LIVE AUCTION ADVISOR")
    print(f"Initial Starting Purse: {total_balance} credits\n")

    for round_num in range(1, 5):
        round_info = RESERVE_SCHEDULE[round_num]
        reserve = round_info["reserve"]
        available_bid = max(0, total_balance - reserve)

        print_header(f"ROUND {round_num}: {round_info['name'].upper()}")
        print(f"Total Bankroll:    {total_balance} cr")
        print(f"Reserve Locked:    {reserve} cr")
        print(f"Max Available Bid: {available_bid} cr")
        print("-" * 65)
        print(f"{'Item':<28} {'Base':<8} {'Inc':<8} {'Ceiling':<10} {'Strategy'}")
        print("-" * 65)

        for item, (base, inc, ceiling, strat) in round_info["items"].items():
            inc_str = str(inc) if inc > 0 else "—"
            print(f"{item:<28} {base:<8} {inc_str:<8} {ceiling:<10} {strat}")
        print("-" * 65)

        while True:
            choice = input(f"\nSelect resource won in Round {round_num} (or type item name): ").strip()
            # Match item case-insensitively
            matched = [k for k in round_info["items"] if choice.lower() in k.lower()]
            if matched:
                item_name = matched[0]
                break
            print(f"Could not match '{choice}'. Please pick from the list above.")

        while True:
            try:
                price_str = input(f"Enter winning price paid for '{item_name}' (cr): ").strip()
                price_paid = int(price_str)
                if price_paid > available_bid:
                    print(f"Warning: {price_paid} exceeds allowed available bid limit ({available_bid} cr).")
                if price_paid < 0:
                    print("Price cannot be negative.")
                    continue
                break
            except ValueError:
                print("Please enter a valid integer.")

        total_balance -= price_paid
        won_inventory[round_info['name']] = (item_name, price_paid)

        print(f"\n✅ SECURED: {item_name} for {price_paid} cr.")
        print(f"💰 Remaining Total Balance: {total_balance} cr.")

    print_header("AUCTION COMPLETED - FINAL WON INVENTORY")
    total_spent = 10000 - total_balance
    for r_name, (item, price) in won_inventory.items():
        print(f"• {r_name:<20}: {item} ({price} cr)")
    print("-" * 65)
    print(f"Total Spent: {total_spent} cr | Remaining Surplus: {total_balance} cr")
    print("=" * 65 + "\n")

if __name__ == "__main__":
    main()
