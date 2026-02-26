#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Env,
};

#[contracttype]
pub enum DataKey {
    TotalAmount,
}

#[contracttype]
#[derive(Clone)]
pub struct DonationEvent {
    pub donor: Address,
    pub amount: i128,
}

#[contract]
pub struct CrowdfundingContract;

#[contractimpl]
impl CrowdfundingContract {
    pub fn donate(env: Env, donor: Address, amount: i128) {
        donor.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        let key = DataKey::TotalAmount;
        let mut total: i128 = env
            .storage()
            .instance()
            .get(&key)
            .unwrap_or(0);

        total += amount;
        env.storage().instance().set(&key, &total);

        let event = DonationEvent { donor, amount };

        env.events().publish((symbol_short!("donation"),), event);
    }

    pub fn get_total(env: Env) -> i128 {
        let key = DataKey::TotalAmount;
        env.storage()
            .instance()
            .get(&key)
            .unwrap_or(0)
    }
}